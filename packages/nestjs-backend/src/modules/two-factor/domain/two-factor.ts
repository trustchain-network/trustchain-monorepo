import { Allow, IsNumber } from 'class-validator';

export class TwoFactor {
  @IsNumber()
  id: number;

  @Allow()
  name?: string;
}
