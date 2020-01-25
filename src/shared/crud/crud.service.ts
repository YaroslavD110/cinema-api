import { Repository } from 'typeorm';

import { CRUDEntity } from './crud.entity';

export class CRUDService {
  constructor(
    private readonly entityRepository: Repository<CRUDEntity>,
    private readonly Entity: typeof CRUDEntity
  ) {}

  public async getAll() {
    const result = await this.entityRepository.find();
    return result.map(resultEntity => resultEntity.toResponseObject());
  }

  public async getById(id: number) {
    const result = await this.entityRepository.findOne(id);

    if (!result) {
      return null;
    }

    return result.toResponseObject();
  }

  public async getBySlug(slug: string) {
    const result = await this.entityRepository.findOne({ slug });

    if (!result) {
      return null;
    }

    return result.toResponseObject();
  }

  public async delete(id: number) {
    const result = await this.entityRepository.findOne(id);

    if (!result) {
      return null;
    }

    return this.entityRepository.remove(result);
  }
}
