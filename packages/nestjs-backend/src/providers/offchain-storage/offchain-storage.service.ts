import { Inject, Injectable } from '@nestjs/common';
import {
  IOffchainStorage,
  offchainStorageProvisionToken,
} from './offchain-storage.provider';
import { NotFoundError, UnprocessableEntityError } from 'src/utils/errors';
import { Field, MerkleTree, Poseidon } from 'o1js';

@Injectable()
export class OffchainStorageService {
  constructor(
    @Inject(offchainStorageProvisionToken)
    private readonly store: IOffchainStorage,
  ) {}

  getPublicKey() {
    return { serverPublicKey58: this.store.getPublicKey58() };
  }

  async addData(
    smartContractAddress: string,
    height: number,
    items: Array<[string, string[]]>,
  ) {
    if (items.length > 2 ** (height - 1)) {
      throw new UnprocessableEntityError({ items: 'toManyItems' });
    }

    const data = this.store.getSmartContractData(smartContractAddress) ?? {
      nextNumber: 1,
      height,
      root2data: {},
    };
    if (data.height !== height) {
      throw new UnprocessableEntityError({ items: 'invalidHeight' });
    }

    const newRoot = this.getNewRoot(items, height);
    const newRootNumber = Field(data.nextNumber);

    data.nextNumber += 1;
    data.root2data[newRoot.toString()] = {
      rootNumber: Number(newRootNumber.toBigInt()),
      items,
    };

    await this.store.update(smartContractAddress, data);

    return {
      result: [
        newRootNumber.toString(),
        this.store
          .createSignature([newRoot, newRootNumber])
          .toFields()
          .map((field) => field.toString()),
      ],
    };
  }

  getData(smartContractAddress: string, root: string) {
    const data = this.store.getSmartContractData(smartContractAddress);
    if (!data?.root2data) {
      throw new NotFoundError({ smartContractAddress: 'notFound' });
    }

    const rootData = data.root2data[root];
    if (!rootData?.items) {
      throw new NotFoundError({ root: 'notFound' });
    }

    return { items: rootData.items };
  }

  private getNewRoot(items: Array<[string, string[]]>, height: number): Field {
    const idx2fields = items.reduce(
      (acc, [index, fields]) =>
        acc.set(
          BigInt(index),
          fields?.map((field) => Field.fromJSON(field)),
        ),
      new Map<bigint, Field[]>(),
    );

    const tree = new MerkleTree(height);
    Array.from(idx2fields.entries()).forEach(([index, fields]) => {
      tree.setLeaf(BigInt(index), Poseidon.hash(fields));
    });

    return tree.getRoot();
  }
}
