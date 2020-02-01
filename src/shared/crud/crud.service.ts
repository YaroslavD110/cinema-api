import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { CRUDEntity } from './crud.entity';

export interface ICRUDServiceConfig {
  entityRepository: Repository<CRUDEntity>;
  Entity: typeof CRUDEntity;
}

export class CRUDService<EntityDTO> {
  constructor(private readonly crudConfig: ICRUDServiceConfig) {}

  public async getAll(): Promise<CRUDEntity[]> {
    const result = await this.crudConfig.entityRepository.find();
    return result.map(resultEntity => resultEntity.toResponseObject());
  }

  public async getById(id: number): Promise<CRUDEntity | null> {
    const result = await this.crudConfig.entityRepository.findOne(id);

    if (!result) {
      return null;
    }

    return result.toResponseObject();
  }

  public async getBySlug(slug: string): Promise<CRUDEntity | null> {
    const result = await this.crudConfig.entityRepository.findOne({ slug });

    if (!result) {
      return null;
    }

    return result.toResponseObject();
  }

  public async delete(id: number): Promise<CRUDEntity | null> {
    const result = await this.crudConfig.entityRepository.findOne(id);

    if (!result) {
      return null;
    }

    return await this.crudConfig.entityRepository.remove(result);
  }

  public async add(data: EntityDTO): Promise<CRUDEntity> {
    try {
      let entity = plainToClass(this.crudConfig.Entity, data);
      const newEntity = await this.crudConfig.entityRepository.save(entity);

      return newEntity.toResponseObject();
    } catch (error) {
      throw new Error(error.code);
    }
  }
}
