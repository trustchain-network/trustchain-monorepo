import { Controller, Get, Param, Query } from '@nestjs/common';
import { NfcsService } from './../nfcs.service';
import { ApiTags } from '@nestjs/swagger';
import { NFC } from './../domain/nfc';
import { TagDataDto } from 'src/providers/sdm/dto/tag-data.dto';
import { TagDataEncryptedDto } from 'src/providers/sdm/dto/tag-data-encrypted.dto';
import { TSDMResponse } from 'src/providers/sdm/types';

@ApiTags('Nfcs')
@Controller({
  path: 'public/nfcs',
  version: '1',
})
export class NfcsPublicController {
  constructor(private readonly nfcsService: NfcsService) {}

  @Get('tagpt/:id')
  tagpt(
    @Param('id') id: NFC['id'],
    @Query() data: TagDataDto,
  ): Promise<TSDMResponse> {
    return this.nfcsService.getValidatedData(id, data, 'tagpt');
  }

  @Get('tag/:id')
  tag(
    @Param('id') id: NFC['id'],
    @Query() data: TagDataEncryptedDto,
  ): Promise<TSDMResponse> {
    return this.nfcsService.getValidatedData(id, data, 'tag');
  }

  @Get('tagtt/:id')
  tagtt(
    @Param('id') id: NFC['id'],
    @Query() data: TagDataEncryptedDto,
  ): Promise<TSDMResponse> {
    return this.nfcsService.getValidatedData(id, data, 'tagtt');
  }
}
