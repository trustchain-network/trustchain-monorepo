import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { NfcStatus } from 'src/modules/nfc-statuses/domain/nfc-status';

@Entity({
  name: 'nfc-status',
})
export class NfcStatusEntity
  extends EntityRelationalHelper
  implements NfcStatus
{
  @PrimaryColumn()
  id: number;

  @Column()
  name?: string;
}
