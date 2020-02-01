import {
  Get,
  Param,
  HttpException,
  HttpStatus,
  Delete,
  Body,
  Post
} from '@nestjs/common';

import { GetByIdParams, GetBySlugParams } from '../dto/params.dto';
import { CRUDEntity } from './crud.entity';
import { CRUDService } from './crud.service';

export class CRUDController<EntityDTO> {
  constructor(private readonly crudService: CRUDService<EntityDTO>) {}

  @Get('/')
  public async getAll(params?: any): Promise<CRUDEntity[]> {
    return await this.crudService.getAll();
  }

  @Get('/:id')
  public async getById(@Param() params: GetByIdParams): Promise<CRUDEntity> {
    const result = await this.crudService.getById(params.id);

    if (!result) {
      throw new HttpException('Resource not found!', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  @Get('/slug/:slug')
  public async getBySlug(
    @Param() params: GetBySlugParams
  ): Promise<CRUDEntity> {
    const result = await this.crudService.getBySlug(params.slug);

    if (!result) {
      throw new HttpException('Resource not found!', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  @Delete('/:id')
  public async delete(@Param() params: GetByIdParams): Promise<boolean> {
    const deletedEntity = await this.crudService.delete(params.id);

    if (!deletedEntity) {
      throw new HttpException('Resource not found!', HttpStatus.NOT_FOUND);
    }

    return true;
  }

  @Post('/add')
  public async add(@Body() data: EntityDTO, param?: any): Promise<CRUDEntity> {
    try {
      return await this.crudService.add(data);
    } catch (error) {
      if (error.message === '23505' /* Duplicate unique value error code */) {
        throw new HttpException(
          'Duplicated unigue value!',
          HttpStatus.BAD_REQUEST
        );
      } else {
        throw new HttpException(
          'Unable to save this data!',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }
}
