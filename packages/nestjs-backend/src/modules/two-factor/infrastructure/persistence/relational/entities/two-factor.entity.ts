import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { TwoFactor } from 'src/modules/two-factor/domain/two-factor';

@Entity({
  name: 'two_factor',
})
export class TwoFactorEntity
  extends EntityRelationalHelper
  implements TwoFactor
{
  @PrimaryColumn()
  id: number;

  @Column()
  name?: string;
}
