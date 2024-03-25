import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength } from 'class-validator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';
import { RoleDto } from 'src/modules/roles/dto/role.dto';
import { StatusDto } from 'src/modules/statuses/dto/status.dto';
import { FileDto } from 'src/modules/files/dto/file.dto';
import { TwoFactor } from 'src/modules/two-factor/domain/two-factor';
// import { UpdateTeamDto } from 'src/modules/teams/dto/update-team.dto';
import { Team } from 'src/modules/teams/domain/team';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @IsOptional()
  @IsEmail()
  email?: string | null;

  @ApiProperty()
  @IsOptional()
  @MinLength(6)
  password?: string;

  provider?: string;

  socialId?: string | null;

  @ApiProperty({ example: 'John' })
  @IsOptional()
  firstName?: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsOptional()
  lastName?: string | null;

  @ApiProperty({ type: FileDto })
  @IsOptional()
  photo?: FileDto | null;

  @ApiProperty({ type: RoleDto })
  @IsOptional()
  @Type(() => RoleDto)
  role?: RoleDto | null;

  @ApiProperty({ type: Team })
  @IsOptional()
  @Type(() => Team)
  team?: Team | null;

  @ApiProperty()
  @IsOptional()
  countryCode?: string | null;

  @ApiProperty()
  @IsOptional()
  twoFactor?: TwoFactor | null;

  @ApiProperty()
  @IsOptional()
  twoFactorPhone?: string | null;

  @ApiProperty()
  @IsOptional()
  twoFactorSecret?: string | null;

  @ApiProperty({ type: StatusDto })
  @IsOptional()
  @Type(() => StatusDto)
  status?: StatusDto;

  hash?: string | null;

  // updatedBy?: string | null;
}
