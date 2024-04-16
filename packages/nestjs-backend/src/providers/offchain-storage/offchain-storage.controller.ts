import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OffchainStorageService } from './offchain-storage.service';
import { GetOffchainStorageDataQueryDto } from './dto/get-offchain-storage-data-query.dto';
import { AddOffchainStorageDataBodyDto } from './dto/add-offchain-storage-data-body.dto';

@ApiBearerAuth()
@ApiTags('Offchain Storage')
@Controller({
  path: 'offchain-storage',
  version: '1',
})
export class OffchainStorageController {
  constructor(private readonly service: OffchainStorageService) {}

  @Post('data')
  addData(
    @Body()
    { zkAppAddress, height, items }: AddOffchainStorageDataBodyDto,
  ) {
    return this.service.addData(zkAppAddress, height, items);
  }

  @Get('data')
  getData(@Query() { zkAppAddress, root }: GetOffchainStorageDataQueryDto) {
    return this.service.getData(zkAppAddress, root);
  }

  @Get('publicKey')
  getPublicKey() {
    return this.service.getPublicKey();
  }
}
