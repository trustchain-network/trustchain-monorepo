import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  HttpException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/modules/roles/roles.guard';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { Plan } from './domain/plan';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { UserDecorator } from '../users/user.decorator';
import { UsersService } from '../users/users.service';

@ApiBearerAuth()
@Roles(RoleEnum.admin, RoleEnum.user, RoleEnum.member)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Plans')
@Controller({
  path: 'plans',
  version: '1',
})
export class PlansController {
  constructor(
    private readonly plansService: PlansService,
    private readonly usersService: UsersService,
  ) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createPlanDto: CreatePlanDto,
    @UserDecorator('id') logedInUserId: string,
  ): Promise<Plan> {
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
    return this.plansService.create(createPlanDto, logedInUserId);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  update(
    @Param('id') id: Plan['id'],
    @Body() updatePlanDto: UpdatePlanDto,
    @UserDecorator('id') logedInUserId: string,
  ): Promise<Plan | null> {
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
    return this.plansService.update(id, updatePlanDto, logedInUserId);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Plan['id']): Promise<void> {
    return this.plansService.softDelete(id);
  }
}
