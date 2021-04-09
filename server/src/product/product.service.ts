import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ProductDTO, ProductResponseObject } from './product.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
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
    return products.map((product) => this.toResponseObject(product));
  }

  async create(
    userId: string,
    data: ProductDTO,
  ): Promise<ProductResponseObject> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
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
}
