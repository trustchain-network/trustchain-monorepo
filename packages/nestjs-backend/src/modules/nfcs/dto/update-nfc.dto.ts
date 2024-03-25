import { PartialType } from '@nestjs/swagger';
import { CreateNfcDto } from './create-nfc.dto';

export class UpdateNfcDto extends PartialType(CreateNfcDto) {}
