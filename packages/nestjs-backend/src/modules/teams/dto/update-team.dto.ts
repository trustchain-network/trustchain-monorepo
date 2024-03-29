import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateTeamDto } from './create-team.dto';
import { User } from 'src/modules/users/domain/user';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  description?: string | null;

  @ApiProperty()
  @IsNotEmpty()
  user: User;

  updatedBy?: User | null;
}
