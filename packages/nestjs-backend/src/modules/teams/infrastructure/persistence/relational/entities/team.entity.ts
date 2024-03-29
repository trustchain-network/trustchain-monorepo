import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Team } from 'src/modules/teams/domain/team';
import { UserEntity } from 'src/modules/users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: 'team',
})
export class TeamEntity extends EntityRelationalHelper implements Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String, unique: true, nullable: false })
  @Expose({ groups: ['me', 'admin'] })
  name: string;

  @Column({ type: String, nullable: true })
  description?: string | null;

  @ManyToOne(() => UserEntity, { eager: true })
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => UserEntity, { eager: true })
  createdBy?: UserEntity | null;

  @ManyToOne(() => UserEntity, { eager: true })
  updatedBy?: UserEntity | null;

  @ManyToOne(() => UserEntity, { eager: true })
  deletedBy?: UserEntity | null;
}
