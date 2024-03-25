import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { NullableType } from 'src/utils/types/nullable.type';
import { KeysService } from './keys.service';
import { CreateKeyDto } from './dto/create-key.dto';
import { Key } from './domain/key';

@ApiTags('Keys')
@Controller({
  path: 'keys',
  version: '1',
})
export class KeysController {
  constructor(private keyService: KeysService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createKeyDto: CreateKeyDto): Promise<Key> {
    return this.keyService.create(createKeyDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  async findOne(@Param('id') id: Key['id']): Promise<NullableType<Key>> {
    return this.keyService.findOne({ id });
  }
}
