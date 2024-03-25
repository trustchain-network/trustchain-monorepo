import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// We test here with Add contract
import { AccountUpdate, Field, Mina, PrivateKey, fetchAccount } from 'o1js';
import { Add } from './Add';
import { KeysService } from 'src/providers/keys/keys.service';
import { CreateKeyDto } from 'src/providers/keys/dto/create-key.dto';
import { AllConfigType } from 'src/config/config.type';
import { Contract } from './domain/contract';

interface VerificationKeyData {
  data: string;
  hash: Field;
}

@Injectable()
export class MinaService {
  private logger = new Logger(MinaService.name);

  constructor(
    private configService: ConfigService<AllConfigType>,
    private keyService: KeysService,
  ) {
    //TODO: Add the configService.getOrThrow for the mina.serverPrivateKey
    //TODO: Mina.setActiveInstance(network);
  }

  async generateKeyPair(): Promise<String> {
    const key = PrivateKey.random();
    const publicKey = key.toPublicKey().toBase58().toString();
    const createKeyDto: CreateKeyDto = {
      key: key.toBase58().toString(),
      publicKey: publicKey,
    };
    await this.keyService.create(createKeyDto);
    return publicKey;
  }

  async deployContract(): Promise<Contract> {
    const zkAppKey = PrivateKey.random();
    const zkAppAddress = zkAppKey.toPublicKey();
    const transactionFee = 100_000_000;

    // Fee payer setup
    const senderKey: PrivateKey = PrivateKey.fromBase58(
      this.configService.getOrThrow<string>('mina.serverPrivateKey', {
        infer: true,
      }),
    );
    const sender = senderKey.toPublicKey();

    // Network configuration
    const network = Mina.Network({
      mina: this.configService.getOrThrow<string>('mina.networkUrl', {
        infer: true,
      }),
    });
    Mina.setActiveInstance(network);

    const accountDetails = (await fetchAccount({ publicKey: sender })).account;
    const nonce: number = Number(accountDetails?.nonce) + 1;
    this.logger.log(
      `Using the fee payer account ${sender.toBase58()} with nonce: ${nonce} and balance: ${accountDetails?.balance}.`,
    );
    console.log(
      `Using the fee payer account ${sender.toBase58()} with nonce: ${nonce} and balance: ${accountDetails?.balance}.`,
    );

    // zkApp compilation
    console.log('Compiling the smart contract.');
    const { verificationKey } = await Add.compile();
    const zkApp = new Add(zkAppAddress);

    // zkApp deployment
    this.logger.log(
      `Deploying zkApp for public key ${zkAppAddress.toBase58()}.`,
    );
    console.log(`Deploying zkApp for public key ${zkAppAddress.toBase58()}.`);
    let transaction = await Mina.transaction(
      { sender, fee: transactionFee },
      () => {
        AccountUpdate.fundNewAccount(sender);
        zkApp.deploy({
          zkappKey: zkAppKey,
          verificationKey: verificationKey as VerificationKeyData,
        });
      },
    );

    transaction.sign([senderKey, zkAppKey]);
    this.logger.log('Sending the transaction.', transaction);
    console.log('Sending the transaction.');
    await transaction.send();

    const contract: Contract = {
      publicKey: zkAppAddress.toBase58().toString(),
    };

    return contract;
  }
}
