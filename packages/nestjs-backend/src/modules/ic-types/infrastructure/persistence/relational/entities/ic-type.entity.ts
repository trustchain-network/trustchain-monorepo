import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { IcType } from 'src/modules/ic-types/domain/ic-types';

@Entity({
  name: 'icType',
})
export class IcTypeEntity extends EntityRelationalHelper implements IcType {
  @PrimaryColumn()
  id: number;

  @Column()
  name?: string;
}
