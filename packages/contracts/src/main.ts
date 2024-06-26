import {
  Bool,
  PrivateKey,
  Poseidon,
  PublicKey,
  Field,
  AccountUpdate,
  Mina,
  MerkleTree,
  MerkleWitness,
  fetchAccount,
} from 'o1js';
import XMLHttpRequestTs from 'xmlhttprequest-ts';
import random from 'random-bigint';
import {
  height,
  OffChainStorageTestContract,
} from './OffChainStorageTestContract.js';
import { get, getPublicKey, requestStore } from './offChainStorage.js';

const NodeXMLHttpRequest =
  XMLHttpRequestTs.XMLHttpRequest as any as typeof XMLHttpRequest;

let transactionFee = 10_000_000;

(async function main() {
  // await isReady;

  console.log('O1js loaded');

  const useLocalBlockchain = false;

  const Local = Mina.LocalBlockchain();
  if (useLocalBlockchain) {
    console.log('Using local blockchain....');
    Mina.setActiveInstance(Local);
  } else {
    console.log('Using Berkeley....');
    const network = Mina.Network(
      'https://proxy.berkeley.minaexplorer.com/graphql'
    );
    // const Berkeley = Mina.(
    //   'https://proxy.berkeley.minaexplorer.com/graphql'
    // );
    Mina.setActiveInstance(network);
  }

  let deployerAccount: PrivateKey;
  let zkAppPrivateKey: PrivateKey;
  zkAppPrivateKey = PrivateKey.random();
  console.log('zkAppPrivateKey', zkAppPrivateKey.toBase58());
  if (useLocalBlockchain) {
    deployerAccount = Local.testAccounts[0].privateKey;
    //zkAppPrivateKey = PrivateKey.random();
  } else {
    // deployerAccount = PrivateKey.fromBase58(
    //   'EKFCsiajZvBcY9zVZcPqMqPRUTzgE2Bgg1Hx8YTMvnTHeeDHoGsP'
    // );
    deployerAccount = PrivateKey.fromBase58(
      'EKEm4rw7ivuswTPhN7sV3Ho4B3s1qtCjHRGNXGNWoQEezfeo18PR'
    );
    //zkAppPrivateKey = PrivateKey.fromBase58(process.argv[3]);

    let response = await fetchAccount({
      publicKey: deployerAccount.toPublicKey().toBase58(),
    });
    if (response.error) throw Error(response.error.statusText);
    let { nonce, balance } = response.account;
    console.log(
      `Using fee payer account with nonce ${nonce}, balance ${balance}`
    );
  }

  // ----------------------------------------------------

  class OffchainStorageMerkleWitness extends MerkleWitness(height) {}

  // create a destination we will deploy the smart contract to
  const zkAppAccount = zkAppPrivateKey.toPublicKey();

  console.log('using zkApp account at', zkAppAccount.toBase58().toString());

  const serverAddress = 'http://localhost:5001/api/v1/offchain-storage';

  const serverPublicKey = await getPublicKey(serverAddress, NodeXMLHttpRequest);
  console.log('using server at', serverPublicKey.toBase58());

  if (!useLocalBlockchain) {
    console.log('Compiling smart contract...');
    await OffChainStorageTestContract.compile();
  }

  let isDeployed = false;
  if (!useLocalBlockchain) {
    let response = await fetchAccount({ publicKey: zkAppAccount });
    console.log('response', response);
    if (response.error == null) {
      isDeployed = true;
    }
  }

  const zkAppInstance = new OffChainStorageTestContract(
    zkAppAccount,
    serverPublicKey
  );
  console.log('zkAppInstance', zkAppInstance);

  if (!isDeployed) {
    console.log('Deploying zkapp...');
    const deploy_txn = await Mina.transaction(
      { feePayerKey: deployerAccount, fee: transactionFee },
      () => {
        AccountUpdate.fundNewAccount(deployerAccount);
        zkAppInstance.deploy({ zkappKey: zkAppPrivateKey });
        zkAppInstance.sign(zkAppPrivateKey);
      }
    );
    const res = await deploy_txn.send();

    if (!useLocalBlockchain) {
      const hash = await res.hash(); // This will change in a future version of SnarkyJS
      if (hash == null) {
        console.log('error sending transaction (see above)');
      } else {
        console.log(
          'See deploy transaction at',
          'https://berkeley.minaexplorer.com/transaction/' + hash
        );
      }
    } else {
      isDeployed = true;
    }
  }

  while (!isDeployed) {
    console.log('waiting for zkApp to be deployed...');
    let response = await fetchAccount({ publicKey: zkAppAccount });
    console.log('response', response);
    isDeployed = response.error == null;
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  // get the initial state of IncrementSecret after deployment
  let root;
  if (useLocalBlockchain) {
    root = await zkAppInstance.root.get();
  } else {
    root = (await zkAppInstance.root.fetch())!;
  }
  console.log('state after init:', root.toString());

  const make_transaction = async (root: Field) => {
    const tree = new MerkleTree(height);

    const idx2fields = await get(
      serverAddress,
      zkAppAccount,
      height,
      root,
      NodeXMLHttpRequest
    );

    console.log('got idx2fields', idx2fields);
    console.log('height', height);
    console.log('root', root.toString());

    for (let [idx, fields] of idx2fields) {
      console.log('setting leaf', idx);
      console.log('fields', Poseidon.hash(fields));
      tree.setLeaf(BigInt(idx), Poseidon.hash(fields));
    }

    const index = random(height - 1);
    const leafIsEmpty = Bool(!idx2fields.has(index));

    const oldNum = leafIsEmpty.toBoolean()
      ? Field(0)
      : idx2fields.get(index)![0];
    const newNum = oldNum.add(1);
    const witness = tree.getWitness(BigInt(index));
    console.log('witness', witness);
    const circuitWitness = new OffchainStorageMerkleWitness(witness);
    tree.setLeaf(BigInt(index), Poseidon.hash([newNum]));
    const newRoot = tree.getRoot();
    console.log('newRoot', newRoot.toString());

    console.log(
      'updating',
      index,
      'from',
      oldNum.toString(),
      'to',
      newNum.toString()
    );

    console.log('updating to new root', newRoot.toString());
    console.log('root from ', zkAppInstance.root.get().toString());

    idx2fields.set(index, [newNum]);
    const [newRootNumber, newRootSignature] = await requestStore(
      serverAddress,
      zkAppAccount,
      height,
      idx2fields,
      NodeXMLHttpRequest
    );

    // ----------------------------------------------------

    if (!useLocalBlockchain) {
      await fetchAccount({ publicKey: deployerAccount.toPublicKey() });
    }
    const txn1 = await Mina.transaction(
      { feePayerKey: deployerAccount, fee: transactionFee },
      () => {
        zkAppInstance.update(
          leafIsEmpty,
          oldNum,
          newNum,
          circuitWitness,
          newRoot,
          newRootNumber,
          newRootSignature
        );
        zkAppInstance.sign(zkAppPrivateKey);
      }
    );

    if (!useLocalBlockchain) {
      console.log('Creating an execution proof...');
      const time0 = Date.now();
      await txn1.prove();
      const time1 = Date.now();
      console.log('creating proof took', (time1 - time0) / 1e3, 'seconds');
    }

    console.log('Sending the transaction...');
    const res = await txn1.send();

    if (!useLocalBlockchain) {
      const hash = await res.hash(); // This will change in a future version of SnarkyJS
      if (hash == null) {
        console.log('error sending transaction (see above)');
      } else {
        console.log(
          'See transaction at',
          'https://berkeley.minaexplorer.com/transaction/' + hash
        );
      }

      let stateChange = false;

      let root2;
      while (!stateChange) {
        console.log(
          'waiting for zkApp state to change... (current state: ',
          root.toString() + ')'
        );
        await new Promise((resolve) => setTimeout(resolve, 5000));
        root2 = await zkAppInstance.root.fetch();
        stateChange = root2 != null && root2.equals(root).not().toBoolean();
      }
    }

    let root2;
    if (useLocalBlockchain) {
      root2 = await zkAppInstance.root.get();
    } else {
      root2 = (await zkAppInstance.root.fetch())!;
    }
    console.log('state after txn:', root2.toString());

    return root2;
  };

  let nextRoot = root;
  for (;;) {
    nextRoot = await make_transaction(nextRoot);
  }
})().catch((e) => {
  console.log('error', e);
});
