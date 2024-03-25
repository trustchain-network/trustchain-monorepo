import { SetMetadata } from '@nestjs/common';

export const IcTypes = (...icTypes: number[]) =>
  SetMetadata('icTypes', icTypes);
