import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export interface ITagData {
  uid: string;
  ctr: string;
  cmac: string;
}

export class TagDataDto implements ITagData {
  @ApiProperty()
  @IsString()
  uid: string;

  @ApiProperty()
  @IsString()
  ctr: string;

  @ApiProperty()
  @IsString()
  cmac: string;
}
