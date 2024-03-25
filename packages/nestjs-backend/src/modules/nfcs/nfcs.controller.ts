import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SerializeOptions,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { NfcsService } from './nfcs.service';
import { CreateNfcDto } from './dto/create-nfc.dto';
import { UpdateNfcDto } from './dto/update-nfc.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/modules/roles/roles.decorator';
import { RoleEnum } from 'src/modules/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/modules/roles/roles.guard';
import { NFC } from './domain/nfc';
import { UserDecorator } from '../users/user.decorator';
import { UsersService } from '../users/users.service';

@ApiBearerAuth()
@Roles(RoleEnum.admin, RoleEnum.member)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Nfcs')
@Controller({
  path: 'nfcs',
  version: '1',
})
export class NfcsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly nfcsService: NfcsService,
  ) {}

  @SerializeOptions({
    groups: ['admin', 'member'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createNfcDto: CreateNfcDto,
    @UserDecorator('id') logedInUserId: string,
  ) {
    const logedInUser = this.usersService.findOne({
      id: logedInUserId,
    });
    if (!logedInUser) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            logedInUserId: 'logedInUserDoenstExists',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return this.nfcsService.create(createNfcDto, logedInUserId);
  }

  @SerializeOptions({
    groups: ['admin', 'member'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.nfcsService.findAll();
  }

  @SerializeOptions({
    groups: ['admin', 'member'],
  })
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.nfcsService.findOne(+id);
  }

  @SerializeOptions({
    groups: ['admin', 'member'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  update(
    @Param('id') id: string,
    @Body() updateNfcDto: UpdateNfcDto,
    @UserDecorator('id') logedInUserId: string,
  ) {
    const logedInUser = this.usersService.findOne({
      id: logedInUserId,
    });
    if (!logedInUser) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            logedInUserId: 'logedInUserDoenstExists',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return this.nfcsService.update(+id, updateNfcDto, logedInUserId);
  }

  // @SerializeOptions({
  //   groups: ['admin', 'member'],
  // })
  // @Delete(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // @HttpCode(HttpStatus.NO_CONTENT)
  // remove(@Param('id') id: NFC['id']): Promise<void> {
  //   return this.nfcsService.softDelete(id);
  // }
}
