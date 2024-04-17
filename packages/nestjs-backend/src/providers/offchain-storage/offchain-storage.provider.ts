import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import { Field, PrivateKey, Signature } from 'o1js';

export type TDataObjMap = {
  [root: string]: {
    rootNumber: number;
    items: Array<[string, string[]]>;
  };
};

export type TSmartContractData = {
  nextNumber: number;
  height: number;
  root2data: TDataObjMap;
};

export type TOffchainFileDb = {
  [smartContractAddress: string]: TSmartContractData;
};

export type TOffchainStorageOptions = {
  privateKey58: string;
};

export interface IOffchainStorage {
  getPublicKey58(): string;

  getSmartContractData(smartContractAddress: string): TSmartContractData;

  update(smartContractAddress: string, data: TSmartContractData): Promise<void>;

  craateSignature(data: [Field, Field]): Signature;

  loadDb(): Promise<void>;
}

export class OffchainStorage implements IOffchainStorage {
  private db: TOffchainFileDb;
  private readonly privateKey: PrivateKey;

  private readonly filepath = './offchain-storage.json';
  private readonly encoding = 'utf-8';
  private readonly logger = new Logger(OffchainStorage.name);

  constructor(options: TOffchainStorageOptions) {
    this.privateKey = PrivateKey.fromBase58(options.privateKey58);
    this.db = {};
  }

  async init(): Promise<void> {
    if (fs.existsSync(this.filepath)) {
      await this.loadDb();
    } else {
      await this.saveDb();

      this.logger.log('DB created');
      this.logger.log(`Public key: ${this.getPublicKey58()}`);
    }
  }

  getPublicKey58(): string {
    return this.privateKey.toPublicKey().toBase58();
  }

  getSmartContractData(smartContractAddress: string): TSmartContractData {
    return this.db[smartContractAddress];
  }

  async update(
    smartContractAddress: string,
    data: TSmartContractData,
  ): Promise<void> {
    this.db[smartContractAddress] = data;

    await this.saveDb();
  }

  craateSignature(data: [Field, Field]): Signature {
    return Signature.create(this.privateKey, data);
  }

  async loadDb(): Promise<void> {
    const fileData = await fs.promises.readFile(this.filepath, this.encoding);

    this.logger.log('DB read');

    const data = JSON.parse(fileData);

    this.db = data.database;

    this.logger.log('DB loaded');
  }

  private saveDb(): Promise<void> {
    return fs.promises.writeFile(
      this.filepath,
      JSON.stringify({ database: this.db }, null, 2),
      this.encoding,
    );
  }
}

export const offchainStorageProvisionToken = Symbol('OFFCHAIN-STORAGE');

export const offchainStorageProvider = {
  provide: offchainStorageProvisionToken,
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    const privateKey58 = config.get<string>('mina.serverPrivateKey', {
      infer: true,
    });
    if (!privateKey58) {
      return;
    }

    const store = new OffchainStorage({ privateKey58 });

    await store.init();

    return store;
  },
};
