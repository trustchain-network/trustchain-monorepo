import { Allow } from 'class-validator';

export class TagStatus {
  @Allow()
  id: number;

  @Allow()
  name?: string;
}
