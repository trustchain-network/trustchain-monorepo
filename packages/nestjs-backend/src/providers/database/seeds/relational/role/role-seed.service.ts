import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/modules/roles/infrastructure/persistence/relational/entities/role.entity';
import { RoleEnum } from 'src/modules/roles/roles.enum';
import { Repository } from 'typeorm';

@Injectable()
export class RoleSeedService {
  constructor(
    @InjectRepository(RoleEntity)
    private repository: Repository<RoleEntity>,
  ) {}

  async run() {
    const countUser = await this.repository.count({
      where: {
        id: RoleEnum.user,
      },
    });

    if (!countUser) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.user,
          name: 'User',
        }),
      );
    }

    const countAdmin = await this.repository.count({
      where: {
        id: RoleEnum.admin,
      },
    });

    if (!countAdmin) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.admin,
          name: 'Admin',
        }),
      );
    }

    const countMember = await this.repository.count({
      where: {
        id: RoleEnum.member,
      },
    });

    if (!countMember) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.member,
          name: 'Member',
        }),
      );
    }

    const countCompany = await this.repository.count({
      where: {
        id: RoleEnum.company,
      },
    });

    if (!countCompany) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.company,
          name: 'Company',
        }),
      );
    }

    const countDeveloper = await this.repository.count({
      where: {
        id: RoleEnum.developer,
      },
    });

    if (!countDeveloper) {
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.developer,
          name: 'Developer',
        }),
      );
    }
  }
}
