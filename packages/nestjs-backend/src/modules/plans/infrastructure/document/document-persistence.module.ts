import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanSchema, PlanSchemaClass } from './entities/plan.schema';
import { PlansDocumentRepository } from './repositories/plan.repository';
import { PlanRepository } from '../persistence/plan.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlanSchemaClass.name, schema: PlanSchema },
    ]),
  ],
  providers: [
    {
      provide: PlanRepository,
      useClass: PlansDocumentRepository,
    },
  ],
  exports: [PlanRepository],
})
export class DocumentUserPersistenceModule {}
