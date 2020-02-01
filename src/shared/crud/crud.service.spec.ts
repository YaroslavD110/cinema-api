import { CRUDEntity } from './crud.entity';
import { ICRUDServiceConfig, CRUDService } from './crud.service';
import { Repository } from 'typeorm';

describe('CRUD Service', () => {
  let entity: CRUDEntity;
  let crudConfig: ICRUDServiceConfig;
  let service: CRUDService<any>;

  beforeEach(() => {
    crudConfig = {
      entityRepository: new Repository<CRUDEntity>(),
      Entity: CRUDEntity
    };

    entity = new CRUDEntity();
    service = new CRUDService(crudConfig);

    jest.spyOn(entity, 'toResponseObject').mockImplementation(() => entity);
  });

  describe('"getAll" method', () => {
    it('should have been success handled', async () => {
      const expectedResult = [entity];

      jest
        .spyOn(crudConfig.entityRepository, 'find')
        .mockResolvedValue(expectedResult);

      const result = await service.getAll();

      expect(result).toEqual(expectedResult);
      expect(crudConfig.entityRepository.find).toHaveBeenCalledTimes(1);
      expect(entity.toResponseObject).toHaveBeenCalledTimes(1);
    });
  });

  describe('"getById" method', () => {
    it('should have been success handled', async () => {
      const expectedResult = entity;

      jest
        .spyOn(crudConfig.entityRepository, 'findOne')
        .mockResolvedValue(expectedResult);

      const result = await service.getById(1);

      expect(result).toEqual(expectedResult);
      expect(crudConfig.entityRepository.findOne).toHaveBeenCalledTimes(1);
      expect(crudConfig.entityRepository.findOne).toHaveBeenCalledWith(1);
      expect(entity.toResponseObject).toHaveBeenCalledTimes(1);
    });

    it('should have been empty', async () => {
      const expectedResult = null;

      jest
        .spyOn(crudConfig.entityRepository, 'findOne')
        .mockResolvedValue(expectedResult);

      const result = await service.getById(1);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('"getBySlug" method', () => {
    const slug = 'some';

    it('should have been success handled', async () => {
      const expectedResult = entity;

      jest
        .spyOn(crudConfig.entityRepository, 'findOne')
        .mockResolvedValue(expectedResult);

      const result = await service.getBySlug(slug);

      expect(result).toEqual(expectedResult);
      expect(crudConfig.entityRepository.findOne).toHaveBeenCalledTimes(1);
      expect(crudConfig.entityRepository.findOne).toHaveBeenCalledWith({
        slug
      });
      expect(entity.toResponseObject).toHaveBeenCalledTimes(1);
    });

    it('should have been empty', async () => {
      const expectedResult = null;

      jest
        .spyOn(crudConfig.entityRepository, 'findOne')
        .mockResolvedValue(expectedResult);

      const result = await service.getBySlug('some');

      expect(result).toEqual(expectedResult);
    });
  });

  describe('"delete" method', () => {
    it('should have been success handled', async () => {
      const expectedResult = entity;

      jest
        .spyOn(crudConfig.entityRepository, 'findOne')
        .mockResolvedValue(expectedResult);
      jest
        .spyOn(crudConfig.entityRepository, 'remove')
        .mockResolvedValue(expectedResult);

      const result = await service.delete(1);

      expect(result).toEqual(expectedResult);
      expect(crudConfig.entityRepository.findOne).toHaveBeenCalledTimes(1);
      expect(crudConfig.entityRepository.findOne).toHaveBeenCalledWith(1);
      expect(crudConfig.entityRepository.remove).toHaveBeenCalledTimes(1);
      expect(crudConfig.entityRepository.remove).toHaveBeenCalledWith(entity);
    });

    it('should have been empty', async () => {
      const expectedResult = null;

      jest
        .spyOn(crudConfig.entityRepository, 'findOne')
        .mockResolvedValue(expectedResult);
      jest
        .spyOn(crudConfig.entityRepository, 'remove')
        .mockResolvedValue(expectedResult);

      const result = await service.getBySlug('some');

      expect(result).toEqual(expectedResult);
      expect(crudConfig.entityRepository.remove).not.toHaveBeenCalled();
    });
  });

  describe('"add" method', () => {
    it('should have been success handled', async () => {
      const mockParams = { slug: 'some' };
      const expectedResult = entity;

      expectedResult.id = 3;
      expectedResult.slug = mockParams.slug;

      jest
        .spyOn(crudConfig.entityRepository, 'save')
        .mockResolvedValue(expectedResult);

      const result = await service.add(mockParams);

      expect(result).toEqual(expectedResult);
      expect(crudConfig.entityRepository.save).toHaveBeenCalledTimes(1);
      expect(crudConfig.entityRepository.save).toHaveBeenCalledWith(mockParams);
      expect(entity.toResponseObject).toHaveBeenCalledTimes(1);
    });
  });
});
