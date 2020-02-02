import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { CRUDEntity } from './crud.entity';

export interface ICRUDServiceConfig {
  entityRepository: Repository<CRUDEntity>;
  Entity: typeof CRUDEntity;
  relations?: string[];
}

export class CRUDService<EntityDTO> {
  constructor(private readonly crudConfig: ICRUDServiceConfig) {}

  public async getAll(): Promise<CRUDEntity[]> {
    const result = await this.crudConfig.entityRepository.find({
      relations: this.crudConfig.relations
    });
    return result.map(resultEntity => resultEntity.toResponseObject());
  }

  public async getById(id: number): Promise<CRUDEntity | null> {
    const result = await this.crudConfig.entityRepository.findOne({
      where: { id },
      relations: this.crudConfig.relations
    });

    if (!result) {
      return null;
    }

    return result.toResponseObject();
  }

  public async getBySlug(slug: string): Promise<CRUDEntity | null> {
    const result = await this.crudConfig.entityRepository.findOne({
      where: { slug },
      relations: this.crudConfig.relations
    });

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
