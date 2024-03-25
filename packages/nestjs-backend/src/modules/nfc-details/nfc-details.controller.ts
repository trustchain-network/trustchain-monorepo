// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   UseGuards,
//   Query,
//   HttpStatus,
//   HttpCode,
//   SerializeOptions,
// } from '@nestjs/common';
// import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
// import { Roles } from '../roles/roles.decorator';
// import { RoleEnum } from '../roles/roles.enum';
// import { AuthGuard } from '@nestjs/passport';
// import { RolesGuard } from 'src/roles/roles.guard';
// import { infinityPagination } from 'src/utils/infinity-pagination';
// import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
// import { NullableType } from '../utils/types/nullable.type';
// import { NfcDetailsService } from './nfc-details.service';
// import { NfcDetail } from './domain/nfc-detail';

// @Controller('nfc-details')
// export class NfcDetailsController {
//   constructor(private readonly nfcDetailsService: NfcDetailsService) {}

//   @SerializeOptions({
//     groups: ['admin'],
//   })
//   @Post()
//   @HttpCode(HttpStatus.CREATED)
//   create(@Body() createNfcDetailsDto: any): Promise<NfcDetail> {
//     return this.nfcDetailsService.create(createNfcDetailsDto);
//   }

//   // @SerializeOptions({
//   //   groups: ['admin'],
//   // })
//   // @Get()
//   // @HttpCode(HttpStatus.OK)
//   // async findAll(
//   //   @Query() query: any,
//   // ): Promise<InfinityPaginationResultType<NfcDetail>> {
//   //   const page = query?.page ?? 1;
//   //   let limit = query?.limit ?? 10;
//   //   if (limit > 50) {
//   //     limit = 50;
//   //   }

//   //   return infinityPagination(
//   //     await this.nfcDetailsService.findManyWithPagination({
//   //       filterOptions: query?.filters,
//   //       sortOptions: query?.sort,
//   //       paginationOptions: {
//   //         page,
//   //         limit,
//   //       },
//   //     }),
//   //     { page, limit },
//   //   );
//   // }

//   @SerializeOptions({
//     groups: ['admin'],
//   })
//   @Get(':id')
//   @HttpCode(HttpStatus.OK)
//   @ApiParam({
//     name: 'id',
//     type: String,
//     required: true,
//   })
//   findOne(@Param('id') id: NfcDetail['id']): Promise<NullableType<NfcDetail>> {
//     return this.nfcDetailsService.findOne({ id });
//   }

//   @SerializeOptions({
//     groups: ['admin'],
//   })
//   @Patch(':id')
//   @HttpCode(HttpStatus.OK)
//   @ApiParam({
//     name: 'id',
//     type: String,
//     required: true,
//   })
//   update(
//     @Param('id') id: NfcDetail['id'],
//     @Body() updateProfileDto: any,
//   ): Promise<NfcDetail | null> {
//     return this.nfcDetailsService.update(id, updateProfileDto);
//   }

//   @Delete(':id')
//   @ApiParam({
//     name: 'id',
//     type: String,
//     required: true,
//   })
//   @HttpCode(HttpStatus.NO_CONTENT)
//   remove(@Param('id') id: NfcDetail['id']): Promise<void> {
//     return this.nfcDetailsService.softDelete(id);
//   }
// }
