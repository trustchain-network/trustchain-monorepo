import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipEntity } from './entities/membership.entity';
import { MembershipRepository } from '../membership.repository';
import { MembershipsRelationalRepository } from './repositories/membership.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MembershipEntity])],
  providers: [
    {
      provide: MembershipRepository,
      useClass: MembershipsRelationalRepository,
    },
  ],
  exports: [MembershipRepository],
})
export class RelationalMembershipPersistenceModule {}
