import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDTO } from './product.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async showAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async create(data: ProductDTO): Promise<ProductEntity> {
    const product = this.productRepository.create(data);
    this.productRepository.save(product);
    return product;
  }

  async showOne(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ id });
    if (!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async update(id: string, data: Partial<ProductDTO>): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ id });
    if (!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.productRepository.update({ id }, data);
    return this.productRepository.findOne({ id });
  }

  async delete(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ id });
    if (!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.productRepository.delete({ id });
    return product;
  }
}
