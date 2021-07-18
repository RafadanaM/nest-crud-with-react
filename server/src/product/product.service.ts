import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { ProductDTO, ProductResponseObject } from './product.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private readonly userService: UserService,
  ) {}

  private toResponseObject(product: ProductEntity): ProductResponseObject {
    return { ...product, creator: product.creator.toResponseObject() };
  }

  private isOwned(product: ProductEntity, userId: string) {
    if (product.creator.id !== userId) {
      throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
    }
  }

  async showAll(): Promise<ProductResponseObject[]> {
    const products = await this.productRepository.find({
      relations: ['creator'],
    });
    console.log('Product ' + products);

    return products.map((product) => this.toResponseObject(product));
  }

  async create(
    userId: string,
    data: ProductDTO,
  ): Promise<ProductResponseObject> {
    const user = await this.userService.getOneUser(userId);
    const product = await this.productRepository.create({
      ...data,
      creator: user,
    });
    await this.productRepository.save(product);
    return this.toResponseObject(product);
  }

  async showOne(id: string): Promise<ProductResponseObject> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['creator'],
    });
    if (!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.toResponseObject(product);
  }

  async getOne(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['creator'],
    });
    if (!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async showAllByUser(id: string): Promise<any> {
    const products = await this.productRepository.find({
      relations: ['creator'],
      where: { creator: { id: id } },
    });

    return products.map((product) => this.toResponseObject(product));
  }

  async update(
    userId: string,
    id: string,
    data: Partial<ProductDTO>,
  ): Promise<ProductResponseObject> {
    let product = await this.productRepository.findOne({
      where: id,
      relations: ['creator'],
    });
    if (!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.isOwned(product, userId);
    await this.productRepository.update({ id }, data);
    product = await this.productRepository.findOne({
      where: id,
      relations: ['creator'],
    });
    return this.toResponseObject(product);
  }

  async delete(userId: string, id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: id,
      relations: ['creator'],
    });

    if (!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.isOwned(product, userId);
    await this.productRepository.delete({ id });
    return product;
  }

  async bookmark(id: string, userId: string) {
    let message = '';
    let isAdd = true;
    const product = await this.productRepository.findOne({ where: { id } });
    const user = await this.userService.getOneUser(userId);

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    if (
      user.wishlist.filter(
        (wishlistedProduct) => wishlistedProduct.id === product.id,
      ).length < 1
    ) {
      user.wishlist.push(product);
      await this.userService.save(user);
      message = 'product added to wishlist';
    } else {
      user.wishlist = user.wishlist.filter(
        (wishlistedProduct) => wishlistedProduct.id !== product.id,
      );
      await this.userService.save(user);
      isAdd = false;
      message = 'product removed from wishlist';
      // throw new HttpException('Idea AlreadyBookmarked', HttpStatus.BAD_REQUEST);
    }
    return { isAdd: isAdd, message: message };
  }
}
