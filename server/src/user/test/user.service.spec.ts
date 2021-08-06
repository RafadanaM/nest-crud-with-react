import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RoleService } from '../../role/role.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';
import { UserService } from '../user.service';
import { users } from './user.mock';
import { roleMockData } from '../../role/test/role.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let roleService: RoleService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        RoleService,
        { provide: getRepositoryToken(UserEntity), useClass: Repository },
      ],
    })
      .overrideProvider(RoleService)
      .useValue({
        getOneRole: jest.fn(),
      })
      .compile();
    roleService = module.get<RoleService>(RoleService);
    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('Get all users', () => {
    it('should return all users', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValueOnce([...users]);
      expect(await userService.getAll()).toHaveLength(users.length);
    });
  });

  describe('Get user by email or username', () => {
    it('should return a user', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(users[0]);
      expect(
        await userService.getOneByEmailOrUsername(
          users[0].username,
          users[0].email,
        ),
      ).toStrictEqual(users[0]);
    });
  });

  describe('Save user', () => {
    it('should save a user', async () => {
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(users[0]);
      expect(await userService.save(users[0])).toStrictEqual(users[0]);
    });
  });

  describe('Get one user', () => {});

  describe('Add Seller Role', () => {
    it('should add seller role', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(users[0]);
      jest
        .spyOn(roleService, 'getOneRole')
        .mockResolvedValueOnce(roleMockData[0]);
      jest
        .spyOn(userRepository, 'update')
        .mockResolvedValueOnce({ raw: [], affected: 1, generatedMaps: [] });
      expect(await userService.updateSellerRole(users[0].id)).toEqual(
        'Adding Seller Role Success',
      );
    });

    it('should throw Not Found Error', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);
      await expect(
        userService.updateSellerRole(users[0].id),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw Bad Request Error', async () => {
      const user: UserEntity = { ...users[0], roles: [roleMockData[0]] };
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);
      jest
        .spyOn(roleService, 'getOneRole')
        .mockResolvedValueOnce(roleMockData[0]);

      await expect(userService.updateSellerRole(user.id)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });
});
