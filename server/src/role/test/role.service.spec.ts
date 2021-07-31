import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../role.entity';
import { RoleService } from '../role.service';
import { roleMockData } from './role.mock';

describe('RoleService', () => {
  let roleService: RoleService;
  let roleRepository: Repository<RoleEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        { provide: getRepositoryToken(RoleEntity), useClass: Repository },
      ],
    }).compile();
    jest.clearAllMocks();
    roleService = module.get<RoleService>(RoleService);
    roleRepository = module.get<Repository<RoleEntity>>(
      getRepositoryToken(RoleEntity),
    );
  });

  it('should be defined', () => {
    expect(roleService).toBeDefined();
  });

  describe('Get one Role', () => {
    it('should return one role', async () => {
      jest
        .spyOn(roleRepository, 'findOne')
        .mockResolvedValueOnce(roleMockData[0]);
      expect(await roleService.getOneRole('Seller')).toStrictEqual(
        roleMockData[0],
      );
    });

    it('should throw Not Found Error', async () => {
      jest.spyOn(roleRepository, 'findOne').mockResolvedValueOnce(undefined);
      await expect(roleService.getOneRole('Seller')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
