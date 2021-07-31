import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { users } from '../user/user.mock';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { ProductDTO } from './product.dto';

import { ProductEntity } from './product.entity';
import { productDataMock, products } from './product.mock';
import { ProductService } from './product.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
describe('ProductService', () => {
  let productService: ProductService;
  let userService: UserService;
  let productRepository: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        UserService,
        {
          provide: getRepositoryToken(ProductEntity),
          useClass: Repository,
        },
      ],
    })
      .overrideProvider(UserService)
      .useValue({
        toResponseObject: jest.fn((user) => {
          return {
            ...user,
          };
        }),
        getOneUser: jest.fn(),
        save: jest.fn(),
      })
      .compile();
    jest.clearAllMocks();
    productService = module.get<ProductService>(ProductService);
    userService = module.get<UserService>(UserService);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('findAllProducts', () => {
    it('should return all products', async () => {
      jest
        .spyOn(productRepository, 'find')
        .mockResolvedValueOnce([...products]);
      expect((await productService.showAll()).length).toEqual(1);
    });
  });

  describe('Create New Products', () => {
    it('should create new product successfully', async () => {
      const productDTO: ProductDTO = {
        name: 'new Product',
        description: 'desc',
        weight: 1,
        width: 1,
        length: 1,
        height: 1,
        price: 100,
        stock: 2,
      };
      jest
        .spyOn(productRepository, 'create')
        .mockReturnValueOnce(productDataMock);
      jest
        .spyOn(productRepository, 'save')
        .mockResolvedValueOnce(productDataMock);
      expect(
        await productService.create(users[0].id, productDTO),
      ).toStrictEqual(productDataMock);
    });
  });

  describe('Show one product', () => {
    it('should return one product', async () => {
      jest
        .spyOn(productRepository, 'findOne')
        .mockResolvedValueOnce(productDataMock);
      const product = await productService.showOne(productDataMock.id);
      expect(product).toStrictEqual(productDataMock);
    });
    it('should throw Not Found error', async () => {
      jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(
        productService.showOne(productDataMock.id),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('Get one product', () => {
    it('should return one product', async () => {
      jest
        .spyOn(productRepository, 'findOne')
        .mockResolvedValueOnce(productDataMock);
      const product = await productService.getOne(productDataMock.id);
      expect(product).toStrictEqual(productDataMock);
    });
    it('should throw 404 error', async () => {
      jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(
        productService.getOne(productDataMock.id),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('Show products by user', () => {
    it('should return products by user', async () => {
      jest
        .spyOn(productRepository, 'find')
        .mockResolvedValueOnce([...products]);
      expect(await productService.showAllByUser(users[0].id)).toHaveLength(1);
    });
  });

  describe('Update Product', () => {
    it('Should update product succesfully', async () => {
      const productDTO: Partial<ProductDTO> = {
        name: 'new Product',
      };
      const result: ProductEntity = {
        ...productDataMock,
        name: productDTO.name,
      };
      jest
        .spyOn(productRepository, 'findOne')
        .mockResolvedValueOnce(productDataMock);
      jest
        .spyOn(productRepository, 'update')
        .mockResolvedValueOnce({ raw: [], affected: 1, generatedMaps: [] });
      jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(result);
      expect(
        await productService.update(
          users[0].id,
          productDataMock.id,
          productDTO,
        ),
      ).toStrictEqual(result);
    });
    it('Should throw Not Found product', async () => {
      const productDTO: Partial<ProductDTO> = {
        name: 'new Product',
      };
      const result: ProductEntity = {
        ...productDataMock,
        name: productDTO.name,
      };
      jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(
        productService.update(users[0].id, productDataMock.id, productDTO),
      ).rejects.toThrowError(NotFoundException);
    });

    it('Should throw Forbidden Error', async () => {
      const productDTO: Partial<ProductDTO> = {
        name: 'new Product',
      };
      const result: ProductEntity = {
        ...productDataMock,
        name: productDTO.name,
      };
      jest
        .spyOn(productRepository, 'findOne')
        .mockResolvedValueOnce(productDataMock);

      await expect(
        productService.update('wrongid', productDataMock.id, productDTO),
      ).rejects.toThrowError(ForbiddenException);
    });
  });

  describe('Delete a product', () => {
    it('should delete product successfully', async () => {
      jest
        .spyOn(productRepository, 'findOne')
        .mockResolvedValueOnce(productDataMock);
      jest
        .spyOn(productRepository, 'delete')
        .mockResolvedValueOnce({ raw: [], affected: 1 });
      expect(
        await productService.delete(
          productDataMock.creator.id,
          productDataMock.id,
        ),
      ).toStrictEqual(productDataMock);
    });

    it('Should throw Not Found Error', async () => {
      jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(undefined);
      await expect(
        productService.delete(productDataMock.creator.id, productDataMock.id),
      ).rejects.toThrowError(NotFoundException);
    });

    it('Should throw Forbidden Error', async () => {
      jest
        .spyOn(productRepository, 'findOne')
        .mockResolvedValueOnce(productDataMock);

      await expect(
        productService.delete('wrongId', productDataMock.id),
      ).rejects.toThrowError(ForbiddenException);
    });
  });

  describe('bookmark / unbookmark product', () => {
    it('Should add product to wishlist', async () => {
      jest
        .spyOn(productRepository, 'findOne')
        .mockResolvedValueOnce(productDataMock);
      jest.spyOn(userService, 'getOneUser').mockResolvedValueOnce(users[0]);
      jest.spyOn(userService, 'save').mockResolvedValueOnce(users[0]);
      expect(
        await productService.bookmark(productDataMock.id, users[0].id),
      ).toStrictEqual({ isAdd: true, message: 'product added to wishlist' });
    });
    it('Should remove product to wishlist', async () => {
      const user: UserEntity = { ...users[0], wishlist: [productDataMock] };
      jest
        .spyOn(productRepository, 'findOne')
        .mockResolvedValueOnce(productDataMock);
      jest.spyOn(userService, 'getOneUser').mockResolvedValueOnce(user);
      jest.spyOn(userService, 'save').mockResolvedValueOnce(user);
      expect(
        await productService.bookmark(productDataMock.id, user.id),
      ).toStrictEqual({
        isAdd: false,
        message: 'product removed from wishlist',
      });
    });
  });
  it('should throw Not Found error', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(undefined);
    await expect(
      productService.bookmark(productDataMock.id, users[0].id),
    ).rejects.toThrowError(NotFoundException);
  });
});
