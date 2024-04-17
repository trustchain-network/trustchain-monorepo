import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetOffchainStorageDataQueryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  zkAppAddress: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  root: string;
}
