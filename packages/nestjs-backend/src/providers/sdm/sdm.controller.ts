import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { SdmService } from './sdm.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sdm')
@Controller({
  path: 'sdm',
  version: '1',
})
export class SdmController {
  constructor(private readonly sdmService: SdmService) {}

  @Get('tagpt')
  @HttpCode(HttpStatus.OK)
  getTag(
    @Param('uid') uid: String,
    @Param('ctr') ctr: String,
    @Param('cmac') cmac: String,
  ): any {
    return this.sdmService.getTagUID(uid, ctr, cmac);
  }

  @Get('tag')
  @HttpCode(HttpStatus.OK)
  getTagEncrypted(
    @Param('picc_data') picc_data: String,
    @Param('enc') enc: String,
    @Param('cmac') cmac: String,
  ): any {
    return this.sdmService.getTagEncrypted(picc_data, enc, cmac);
  }

  @Get('tagtt')
  @HttpCode(HttpStatus.OK)
  getTagTamper(
    @Param('picc_data') picc_data: String,
    @Param('enc') enc: String,
    @Param('cmac') cmac: String,
  ): any {
    return this.sdmService.getTagTamper(picc_data, enc, cmac);
  }
}
