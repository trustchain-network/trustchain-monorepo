import { Repository, ObjectLiteral, DeepPartial, Not, In } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

export abstract class BaseFactoryService<Entity extends ObjectLiteral> {
  protected repository: Repository<Entity>;

  protected abstract buildEntity(data?: Partial<Entity>): Entity;

  public async create(data?: Partial<Entity>): Promise<Entity> {
    return await this.repository.save(this.buildEntity(data));
  }

  public async createMany(
    amount: number,
    data?: Partial<Entity>,
  ): Promise<Entity[]> {
    return await this.repository.save(
      Array(amount)
        .fill('')
        .map(() => this.buildEntity(data)),
    );
  }

  public async deleteEntities(entities: Entity[]) {
    await this.repository.delete(entities.map((entity) => entity.id));
  }

  public async clearTable(except: Entity[] = [], primaryKey?: string) {
    await this.repository.delete({
      [primaryKey || ('id' as keyof Entity)]: Not(
        In(except.map((entity) => entity.id)),
      ),
    } as FindOptionsWhere<Entity>);
  }

  public async updateEntity(
    entity: DeepPartial<Entity>,
    newFields: Partial<Entity>,
  ) {
    await this.repository.update(entity.id, newFields);
  }

  public async saveEntity(entity: DeepPartial<Entity>) {
    await this.repository.save(entity);
  }

  public async getEntityByField(searchOption: Partial<Entity>) {
    return await this.repository.findOne({ where: searchOption });
  }

  public async getEntitiesByField(searchOption: FindOptionsWhere<Entity>) {
    return await this.repository.find({ where: searchOption });
  }

  public async getCount() {
    return await this.repository.count();
  }
}
