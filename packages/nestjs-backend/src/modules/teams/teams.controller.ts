import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiParam } from '@nestjs/swagger';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { TeamsService } from './teams.service';
import { UserDecorator } from '../users/user.decorator';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './domain/team';
import { UsersService } from '../users/users.service';
import { NullableType } from 'src/utils/types/nullable.type';
import { UpdateTeamDto } from './dto/update-team.dto';

@ApiBearerAuth()
@Roles(RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Teams')
@Controller({
  path: 'teams',
  version: '1',
})
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly usersService: UsersService,
  ) {}

  @SerializeOptions({
    groups: ['user'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createTeamDto: CreateTeamDto,
    @UserDecorator('id') logedInUserId: string,
  ): Promise<Team> {
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
    return this.teamsService.create(createTeamDto, logedInUserId);
  }

  @SerializeOptions({
    groups: ['user'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: Team['id']): Promise<NullableType<Team>> {
    return this.teamsService.findOne({ id });
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
  async update(
    @Param('id') id: Team['id'],
    @Body() updateProfileDto: UpdateTeamDto,
    @UserDecorator('id') logedInUserId: string,
  ): Promise<Team | null> {
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
    return this.teamsService.update(id, updateProfileDto, logedInUserId);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Team['id']): Promise<void> {
    return this.teamsService.softDelete(id);
  }
}
