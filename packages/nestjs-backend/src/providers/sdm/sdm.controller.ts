import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { SdmService } from './sdm.service';
import { ApiTags } from '@nestjs/swagger';
import { TagDataDto } from './dto/tag-data.dto';
import { TagDataEncryptedDto } from './dto/tag-data-encrypted.dto';
import { TSDMResponse } from './types';

@ApiTags('sdm')
@Controller({
  path: 'sdm',
  version: '1',
})
export class SdmController {
  constructor(private readonly sdmService: SdmService) {}

  @Get('tagpt')
  @HttpCode(HttpStatus.OK)
  getTag(@Query() data: TagDataDto): Promise<TSDMResponse> {
    return this.sdmService.getTagUID(data);
  }

  @Get('tag')
  @HttpCode(HttpStatus.OK)
  getTagEncrypted(@Query() data: TagDataEncryptedDto): Promise<TSDMResponse> {
    return this.sdmService.getTagEncrypted(data);
  }

  @Get('tagtt')
  @HttpCode(HttpStatus.OK)
  getTagTamper(@Query() data: TagDataEncryptedDto): Promise<TSDMResponse> {
    return this.sdmService.getTagTamper(data);
  }
}
