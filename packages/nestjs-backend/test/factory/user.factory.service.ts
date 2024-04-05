import { BaseFactoryService } from './base.factory.service';
import { faker } from '@faker-js/faker';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserEntity } from 'src/modules/users/infrastructure/persistence/relational/entities/user.entity';
import { User } from 'src/modules/users/domain/user';
import bcrypt from 'bcryptjs';

export class UserFactoryService extends BaseFactoryService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    protected repository: Repository<UserEntity>,
    private authService: AuthService,
  ) {
    super();
  }

  protected buildEntity(data?: Partial<User>) {
    return this.repository.create(
      Object.assign(
        {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          password: 'secret',
          email: faker.internet.email().toLowerCase(),
          biography: faker.person.bio(),
          studentId: faker.string.uuid(),
        },
        data,
      ),
    );
  }

  public async create(data?: Partial<User>): Promise<UserEntity> {
    const user = this.buildEntity(data);
    user.password = await bcrypt
      .genSalt()
      .then((salt) => bcrypt.hash(user.password || 'secret', salt));

    return this.repository.save(user);
  }

  public async getAuthToken(user: User, password = 'secret'): Promise<string> {
    const { token } = await this.authService.validateLogin({
      email: user.email as string,
      password,
    });

    return token;
  }
}
