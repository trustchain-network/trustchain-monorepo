import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
} from 'class-validator';

export class AddOffchainStorageDataBodyDto {
  @ApiProperty()
  @IsNumber()
  @IsInt()
  @Max(256)
  height: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  zkAppAddress: string;

  @ApiProperty()
  @IsArray({ each: true })
  items: Array<[string, string[]]>;
}
