import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MultiFactorAuthenticationRelationalRepository } from './repositories/multi-factor-authentication.repository';
import { MultiFactorAuthenticationEntity } from './entities/multi-factor-authentication.entity';
import { MultiFactorAuthenticationRepository } from '../multi-factor-authentication.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MultiFactorAuthenticationEntity])],
  providers: [
    {
      provide: MultiFactorAuthenticationRepository,
      useClass: MultiFactorAuthenticationRelationalRepository,
    },
  ],
  exports: [MultiFactorAuthenticationRepository],
})
export class RelationalMultiFactorAuthenticationPersistenceModule {}
