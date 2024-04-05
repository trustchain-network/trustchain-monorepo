import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  HttpException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { NullableType } from 'src/utils/types/nullable.type';
import { CreateNfcDetailsDto } from './dto/create-nfc-details.dto';
import { NfcDetailsService } from './nfc-details.service';
import { NfcDetail } from './domain/nfc-detail';
import { UserDecorator } from '../users/user.decorator';
import { UsersService } from '../users/users.service';

@ApiBearerAuth()
@Roles(RoleEnum.admin, RoleEnum.member)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Users')
@Controller({
  path: 'nfc-details',
  version: '1',
})
export class NfcDetailsController {
  constructor(
    private readonly nfcDetailsService: NfcDetailsService,
    private readonly usersService: UsersService,
  ) {}

  @SerializeOptions({
    groups: ['admin', 'member'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createNfcDetailsDto: CreateNfcDetailsDto,
    @UserDecorator('id') logedInUserId: string,
  ): Promise<NfcDetail> {
    const logedInUser = await this.usersService.findUserId(logedInUserId);
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
    return this.nfcDetailsService.create(createNfcDetailsDto);
  }

  @SerializeOptions({
    groups: ['admin', 'member'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: NfcDetail['id']): Promise<NullableType<NfcDetail>> {
    return this.nfcDetailsService.findOne({ id });
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
  async update(
    @Param('id') id: NfcDetail['id'],
    @Body() updateProfileDto: any,
    @UserDecorator('id') logedInUserId: string,
  ): Promise<NfcDetail | null> {
    const logedInUser = await this.usersService.findUserId(logedInUserId);
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
    return this.nfcDetailsService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: NfcDetail['id']): Promise<void> {
    return this.nfcDetailsService.softDelete(id);
  }
}
