import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { NullableType } from '../../utils/types/nullable.type';

import { UserRepository } from './infrastructure/persistence/user.repository';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { User } from './domain/user';
import { FilesService } from 'src/modules/files/files.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthProvidersEnum } from '../auth/auth-providers.enum';
import { RoleEnum } from '../roles/roles.enum';
import { StatusEnum } from '../statuses/statuses.enum';
import { FilterUserDto, SortUserDto } from './dto/query-user.dto';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly filesService: FilesService,
  ) {}

  async create(
    createProfileDto: CreateUserDto,
    logedInUserId?: string,
  ): Promise<User> {
    const clonedPayload = {
      provider: AuthProvidersEnum.email,
      ...createProfileDto,
    };

    if (logedInUserId) {
      const logedInUser = await this.usersRepository.findOne({
        id: logedInUserId,
      });
      clonedPayload.createdBy = logedInUser;
      clonedPayload.updatedBy = logedInUser;
    }

    if (clonedPayload.password) {
      const salt = await bcrypt.genSalt();
      clonedPayload.password = await bcrypt.hash(clonedPayload.password, salt);
    }

    if (clonedPayload.email) {
      const userObject = await this.usersRepository.findOne({
        email: clonedPayload.email,
      });
      if (userObject) {
        this.logger.error('Email already exists');
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              email: 'emailAlreadyExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    if (clonedPayload.photo?.id) {
      const fileObject = await this.filesService.findOne({
        id: clonedPayload.photo.id,
      });
      if (!fileObject) {
        this.logger.error('Image not exists');
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              photo: 'imageNotExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      clonedPayload.photo = fileObject;
    }

    if (clonedPayload.role?.id) {
      const roleObject = Object.values(RoleEnum).includes(
        clonedPayload.role.id,
      );
      if (!roleObject) {
        this.logger.error('Role not exists');
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              role: 'roleNotExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    if (clonedPayload.status?.id) {
      const statusObject = Object.values(StatusEnum).includes(
        clonedPayload.status.id,
      );
      if (!statusObject) {
        this.logger.error('Status not exists');
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              status: 'statusNotExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    return this.usersRepository.create(clonedPayload);
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    return this.usersRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findOne(fields: EntityCondition<User>): Promise<NullableType<User>> {
    return this.usersRepository.findOne(fields);
  }

  async findOneOrFail(fields: EntityCondition<User>): Promise<User> {
    const user = await this.findOne(fields);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `notFound`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async findUserId(userId: string): Promise<string> {
    const user = await this.findOne({
      id: userId,
    });
    if (!user || !user.id) {
      this.logger.error('User not found');
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            user,
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user.id;
  }

  async update(
    id: User['id'],
    payload: DeepPartial<User>,
    logedInUserId?: string,
  ): Promise<User | null> {
    const clonedPayload = { ...payload };

    if (logedInUserId) {
      const logedInUser = await this.usersRepository.findOne({
        id: logedInUserId,
      });
      clonedPayload.updatedBy = logedInUser;
    }

    if (
      clonedPayload.password &&
      clonedPayload.previousPassword !== clonedPayload.password
    ) {
      const salt = await bcrypt.genSalt();
      clonedPayload.password = await bcrypt.hash(clonedPayload.password, salt);
    }

    if (clonedPayload.email) {
      const userObject = await this.usersRepository.findOne({
        email: clonedPayload.email,
      });

      if (userObject?.id !== id) {
        this.logger.error('Email already exists');
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              email: 'emailAlreadyExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    if (clonedPayload.photo?.id) {
      const fileObject = await this.filesService.findOne({
        id: clonedPayload.photo.id,
      });
      if (!fileObject) {
        this.logger.error('Image not exists');
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              photo: 'imageNotExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      clonedPayload.photo = fileObject;
    }

    if (clonedPayload.role?.id) {
      const roleObject = Object.values(RoleEnum).includes(
        clonedPayload.role.id,
      );
      if (!roleObject) {
        this.logger.error('Role not exists');
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              role: 'roleNotExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    if (clonedPayload.status?.id) {
      const statusObject = Object.values(StatusEnum).includes(
        clonedPayload.status.id,
      );
      if (!statusObject) {
        this.logger.error('Status not exists');
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              status: 'statusNotExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    return this.usersRepository.update(id, clonedPayload);
  }

  async softDelete(id: User['id']): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
}
