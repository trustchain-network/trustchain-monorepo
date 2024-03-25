import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanEntity } from 'src/modules/plans/infrastructure/persistence/relational/entities/plan.entity';

import { Repository } from 'typeorm';

@Injectable()
export class PlanSeedService {
  constructor(
    @InjectRepository(PlanEntity)
    private repository: Repository<PlanEntity>,
  ) {}

  async run() {
    const countPlans = await this.repository.count({});

    if (!countPlans) {
      await this.repository.save(
        this.repository.create({
          name: 'Free',
          description: 'Free plan',
          price: 0,
          currency: 'USD',
          duration: 1,
          durationType: 'month',
        }),
      );

      await this.repository.save(
        this.repository.create({
          name: 'Premium',
          description: 'Premium plan',
          price: 9.99,
          currency: 'USD',
          duration: 1,
          durationType: 'month',
        }),
      );

      await this.repository.save(
        this.repository.create({
          name: 'Enterprise',
          description: 'Enterprise plan',
          price: 99.99,
          currency: 'USD',
          duration: 1,
          durationType: 'month',
        }),
      );
    }
  }
}
