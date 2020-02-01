import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CRUDEntity } from './crud.entity';
import { CRUDController } from './crud.controller';
import { ICRUDServiceConfig, CRUDService } from './crud.service';

describe('CRUD Controller', () => {
  let entity: CRUDEntity;
  let crudConfig: ICRUDServiceConfig;
  let service: CRUDService<any>;
  let controller: CRUDController<any>;

  beforeEach(() => {
    crudConfig = {
      entityRepository: new Repository<CRUDEntity>(),
      Entity: CRUDEntity
    };

    entity = new CRUDEntity();
    service = new CRUDService(crudConfig);
    controller = new CRUDController(service);
  });

  describe('"getAll" method', () => {
    it('should have been handled success', async () => {
      const expectedResult = [entity];

      jest
        .spyOn(service, 'getAll')
        .mockImplementation()
        .mockResolvedValue(expectedResult);

      const result = await controller.getAll();

      expect(result).toEqual(expectedResult);
      expect(service.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('"getById" method', () => {
    it('should have been handled success', async () => {
      const params = { id: 1 };
      const expectedResult = entity;

      jest
        .spyOn(service, 'getById')
        .mockImplementation()
        .mockResolvedValue(expectedResult);

      const result = await controller.getById(params);

      expect(result).toEqual(expectedResult);
      expect(service.getById).toHaveBeenCalledTimes(1);
      expect(service.getById).toHaveBeenCalledWith(params.id);
    });

    it('should throw an error if empty', async () => {
      const params = { id: 1 };

      jest
        .spyOn(service, 'getById')
        .mockImplementation()
        .mockResolvedValue(null);

      expect(controller.getById(params)).rejects.toThrowError(HttpException);
    });
  });

  describe('"getBySlug" method', () => {
    it('should have been handled success', async () => {
      const params = { slug: 'some' };
      const expectedResult = entity;

      jest
        .spyOn(service, 'getBySlug')
        .mockImplementation()
        .mockResolvedValue(expectedResult);

      const result = await controller.getBySlug(params);

      expect(result).toEqual(expectedResult);
      expect(service.getBySlug).toHaveBeenCalledTimes(1);
      expect(service.getBySlug).toHaveBeenCalledWith(params.slug);
    });

    it('should throw an error if empty', async () => {
      const params = { slug: 'some' };

      jest
        .spyOn(service, 'getBySlug')
        .mockImplementation()
        .mockResolvedValue(null);

      expect(controller.getBySlug(params)).rejects.toThrowError(HttpException);
    });
  });

  describe('"delete" method', () => {
    it('should have been handled success', async () => {
      const params = { id: 1 };
      const expectedResult = true;

      jest
        .spyOn(service, 'delete')
        .mockImplementation()
        .mockResolvedValue(entity);

      const result = await controller.delete(params);

      expect(result).toEqual(expectedResult);
      expect(service.delete).toHaveBeenCalledTimes(1);
      expect(service.delete).toHaveBeenCalledWith(params.id);
    });

    it('should throw an error if empty', async () => {
      const params = { id: 1 };

      jest
        .spyOn(service, 'delete')
        .mockImplementation()
        .mockResolvedValue(null);

      expect(controller.delete(params)).rejects.toThrowError(HttpException);
    });
  });

  describe('"add" method', () => {
    it('should have been handled success', async () => {
      const mockParams = { slug: 'some' };
      const expectedResult = entity;

      expectedResult.id = 3;
      expectedResult.slug = mockParams.slug;

      jest
        .spyOn(service, 'add')
        .mockImplementation()
        .mockResolvedValue(entity);

      const result = await controller.add(mockParams);

      expect(result).toEqual(expectedResult);
      expect(service.add).toHaveBeenCalledTimes(1);
      expect(service.add).toHaveBeenCalledWith(mockParams);
    });
  });
});
