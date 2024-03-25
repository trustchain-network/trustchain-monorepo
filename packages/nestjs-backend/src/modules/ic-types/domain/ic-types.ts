import { Allow, IsString } from 'class-validator';

export class IcType {
  @IsString()
  id: number;

  @Allow()
  name?: string;
}
