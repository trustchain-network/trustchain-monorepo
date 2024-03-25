export enum IcType {
  NTAG = 'NTAG',
}

export type NfcDetail = {
  id: number | string;
  icManifacturer?: string;
  icType?: IcType;
  memoryInfo?: string;
  technologies?: string[];
  majorVersion?: string;
  minorVersion?: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
