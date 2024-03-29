import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/modules/users/domain/user';

export class CreateTeamDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  description?: string | null;

  @ApiProperty()
  @IsNotEmpty()
  user: User;

  createdBy?: User | null;
  updatedBy?: User | null;
}
