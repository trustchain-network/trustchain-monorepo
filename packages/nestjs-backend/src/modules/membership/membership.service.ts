import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { NotFoundError } from 'src/utils/errors';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership)
    private readonly repo: Repository<Membership>,
  ) {}

  create(data: DeepPartial<Membership>): Promise<Membership> {
    return this.repo.save(this.repo.create(data));
  }

  findOne(
    conditions: FindOptionsWhere<Membership>,
  ): Promise<Membership | null> {
    return this.repo.findOne({ where: conditions });
  }

  async findOneOrFail(
    conditions: FindOptionsWhere<Membership>,
  ): Promise<Membership> {
    const membership = await this.findOne(conditions);
    if (!membership) {
      throw new NotFoundError();
    }

    return membership;
  }

  async update(id: number, data: DeepPartial<Membership>): Promise<Membership> {
    const membership = await this.findOneOrFail({ id });

    return this.repo.save(this.repo.merge(membership, data));
  }
}
