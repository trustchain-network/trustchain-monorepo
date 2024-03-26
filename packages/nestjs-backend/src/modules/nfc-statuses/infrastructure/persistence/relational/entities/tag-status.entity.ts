import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { TagStatus } from 'src/modules/nfc-statuses/domain/tag-status';

@Entity({
  name: 'tag-status',
})
export class TagStatusEntity
  extends EntityRelationalHelper
  implements TagStatus
{
  @PrimaryColumn()
  id: number;

  @Column()
  name?: string;
}
