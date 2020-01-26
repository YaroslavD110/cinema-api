import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { CRUDEntity } from './crud.entity';

interface ICRUDServiceConfig {
  entityRepository: Repository<CRUDEntity>;
  Entity: typeof CRUDEntity;
}

export class CRUDService<EntityDTO> {
  constructor(private readonly crudConfig: ICRUDServiceConfig) {}

  public async getAll() {
    const result = await this.crudConfig.entityRepository.find();
    return result.map(resultEntity => resultEntity.toResponseObject());
  }

  public async getById(id: number) {
    const result = await this.crudConfig.entityRepository.findOne(id);

    if (!result) {
      return null;
    }

    return result.toResponseObject();
  }

  public async getBySlug(slug: string) {
    const result = await this.crudConfig.entityRepository.findOne({ slug });

    if (!result) {
      return null;
    }

    return result.toResponseObject();
  }

  public async delete(id: number) {
    const result = await this.crudConfig.entityRepository.findOne(id);

    if (!result) {
      return null;
    }

    return this.crudConfig.entityRepository.remove(result);
  }

  public async add(data: EntityDTO) {
    let entity = plainToClass(this.crudConfig.Entity, data);
    return this.crudConfig.entityRepository.save(entity);
  }
}
