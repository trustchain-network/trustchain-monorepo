import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { User } from 'src/modules/users/domain/user';
import { IcTypeEnum } from '../enums/ic-types.enum';

export class CreateNfcDetailsDto {
  @ApiProperty()
  @IsOptional()
  icManifacturer?: string | null;

  @ApiProperty({ enum: IcTypeEnum })
  @IsOptional()
  icType?: IcTypeEnum;

  @ApiProperty()
  @IsOptional()
  memoryInfo?: string | null;

  @ApiProperty({ type: () => String, isArray: true })
  @IsOptional()
  @IsString({ each: true })
  technologies?: string[] | null;

  @ApiProperty()
  @IsOptional()
  majorVersion?: string | null;

  @ApiProperty()
  @IsOptional()
  minorVersion?: string | null;

  createdBy?: User | null;
  updatedBy?: User | null;
}
