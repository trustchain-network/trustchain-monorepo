import { BaseFactoryService } from './base.factory.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from 'src/modules/roles/infrastructure/persistence/relational/entities/role.entity';
import { RoleEnum } from 'src/modules/roles/roles.enum';

export class RoleFactoryService extends BaseFactoryService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    protected repository: Repository<RoleEntity>,
  ) {
    super();
  }

  protected buildEntity(data?: Partial<RoleEntity>) {
    return this.repository.create({
      id: RoleEnum.admin,
      name: 'Admin',
      ...(data ?? {}),
    });
  }

  async setup() {
    await this.clearTable();

    await this.repository.save(
      [
        { id: RoleEnum.admin, name: 'Admin' },
        { id: RoleEnum.user, name: 'User' },
        { id: RoleEnum.member, name: 'Member' },
        { id: RoleEnum.company, name: 'Company' },
        { id: RoleEnum.developer, name: 'Developer' },
      ].map((role) => this.buildEntity(role)),
    );
  }
}
