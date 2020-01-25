import { GetByIdParams, GetBySlugParams } from '../dto/params.dto';
import { Get, Param, HttpException, HttpStatus } from '@nestjs/common';

import { CRUDService } from './crud.service';

export class CRUDController {
  constructor(private readonly crudService: CRUDService) {}

  @Get('/')
  public getAll() {
    return this.crudService.getAll();
  }

  @Get('/:id')
  public async getById(@Param() params: GetByIdParams) {
    const result = await this.crudService.getById(params.id);

    if (!result) {
      throw new HttpException('Resource not found!', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  @Get('/slug/:slug')
  public async getBySlug(@Param() params: GetBySlugParams) {
    const result = await this.crudService.getBySlug(params.slug);

    if (!result) {
      throw new HttpException('Resource not found!', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
