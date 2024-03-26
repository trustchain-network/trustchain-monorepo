import { Allow } from 'class-validator';

export class NfcStatus {
  @Allow()
  id: number;

  @Allow()
  name?: string;
}
