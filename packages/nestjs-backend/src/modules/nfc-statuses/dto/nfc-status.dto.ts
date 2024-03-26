import { ApiProperty } from '@nestjs/swagger';
import { NfcStatus } from '../domain/nfc-status';
import { IsNumber } from 'class-validator';

export class NfcStatusDto implements NfcStatus {
  @ApiProperty()
  @IsNumber()
  id: number;
}
