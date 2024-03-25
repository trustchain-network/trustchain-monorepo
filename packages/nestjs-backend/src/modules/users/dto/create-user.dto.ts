import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';
import { RoleDto } from 'src/modules/roles/dto/role.dto';
import { StatusDto } from 'src/modules/statuses/dto/status.dto';
import { FileDto } from 'src/modules/files/dto/file.dto';
import { TwoFactor } from 'src/modules/two-factor/domain/two-factor';
// import { Team } from 'src/modules/teams/domain/team';
//import { CreateTeamDto } from 'src/modules/teams/dto/create-team.dto';
import { Team } from 'src/modules/teams/domain/team';

export class CreateUserDto {
  @ApiProperty({ example: 'test1@trustchain.network' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string | null;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  provider?: string;

  socialId?: string | null;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string | null;

  @ApiProperty({ type: () => FileDto })
  @IsOptional()
  photo?: FileDto | null;

  @ApiProperty({ type: RoleDto })
  @IsOptional()
  @Type(() => RoleDto)
  role?: RoleDto | null;

  // @ApiProperty({ type: Team })
  // @IsOptional()
  // @Type(() => Team)
  // team?: Team | null;

  @ApiProperty()
  @IsOptional()
  countryCode?: string | null;

  @ApiProperty()
  @IsOptional()
  @Type(() => TwoFactor)
  twoFactor: TwoFactor | null;

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

  createdBy?: string | null;
  updatedBy?: string | null;
}
