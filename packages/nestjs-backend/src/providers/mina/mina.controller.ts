import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/modules/roles/roles.decorator';
import { RoleEnum } from 'src/modules/roles/roles.enum';
import { RolesGuard } from 'src/modules/roles/roles.guard';
import { MinaService } from './mina.service';
import { Contract } from './domain/contract';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Mina')
@Controller({
  path: 'mina',
  version: '1',
})
export class MinaController {
  constructor(private readonly minaService: MinaService) {}

  @SerializeOptions({
    groups: ['member', 'admin'],
  })
  @Post('generate-key-pair')
  @HttpCode(HttpStatus.CREATED)
  generateKeyPair(): Promise<String> {
    return this.minaService.generateKeyPair();
  }

  @SerializeOptions({
    groups: ['member', 'admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  deployContract(): Promise<Contract> {
    return this.minaService.deployContract();
  }
}
