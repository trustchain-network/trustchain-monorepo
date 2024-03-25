import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './domain/user';

describe('UsersService using createMock with DI', () => {
  let repo: Repository<User>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: createMock<Repository<User>>(),
        },
      ],
    }).compile();

    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should have the repo mocked', () => {
    expect(typeof repo.find).toBe('function');
  });
});

describe('UsersService using createMock without DI', () => {
  const repo = createMock<Repository<User>>();

  beforeEach(async () => {
    await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: repo,
        },
      ],
    }).compile();
  });

  it('should have the repo mocked', async () => {
    const user = {
      id: 1,
      name: 'Test User',
      email: 'test@test.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
      provider: 'provider',
      firstName: 'firstName',
      lastName: 'lastName',
    };
    repo.find.mockResolvedValue([user]);
    // tslint:disable-next-line: no-invalid-await
    expect(await repo.find()).toEqual([user]);
  });
});
