// import { ApiProperty } from '@nestjs/swagger';
// import {
//   IsNumber,
//   IsOptional,
//   IsString,
//   ValidateNested,
// } from 'class-validator';
// import { Transform, Type, plainToInstance } from 'class-transformer';
// import { NfcDetail } from '../domain/nfc-detail';
// import { IcTypeDto } from '../../ic-types/dto/ic-type.dto';
// import { IcType } from 'src/ic-types/ic-types.enum';

// export class FilterNfcDetailDto {
//   @ApiProperty({ type: IcType })
//   @IsOptional()
//   @ValidateNested({ each: true })
//   @Type(() => IcTypeDto)
//   icTypes?: IcType[] | null;
// }

// export class SortNfcDetailDto {
//   @ApiProperty()
//   @IsString()
//   orderBy: keyof NfcDetail;

//   @ApiProperty()
//   @IsString()
//   order: string;
// }

// export class QueryNfcDetailDto {
//   @ApiProperty({
//     required: false,
//   })
//   @Transform(({ value }) => (value ? Number(value) : 1))
//   @IsNumber()
//   @IsOptional()
//   page: number;

//   @ApiProperty({
//     required: false,
//   })
//   @Transform(({ value }) => (value ? Number(value) : 10))
//   @IsNumber()
//   @IsOptional()
//   limit: number;

//   @ApiProperty({ type: String, required: false })
//   @IsOptional()
//   @Transform(({ value }) =>
//     value ? plainToInstance(FilterNfcDetailDto, JSON.parse(value)) : undefined,
//   )
//   @ValidateNested()
//   @Type(() => FilterNfcDetailDto)
//   filters?: FilterNfcDetailDto | null;

//   @ApiProperty({ type: String, required: false })
//   @IsOptional()
//   @Transform(({ value }) => {
//     return value
//       ? plainToInstance(SortNfcDetailDto, JSON.parse(value))
//       : undefined;
//   })
//   @ValidateNested({ each: true })
//   @Type(() => SortNfcDetailDto)
//   sort?: SortNfcDetailDto[] | null;
// }
