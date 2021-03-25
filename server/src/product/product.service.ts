import { Injectable } from '@nestjs/common';
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

  async showAll() {
    return await this.productRepository.find();
  }

  async create(data: ProductDTO) {
    const product = await this.productRepository.create(data);
    await this.productRepository.save(product);
    return product;
  }

  async showOne(id: string) {
    return await this.productRepository.findOne({ id });
  }

  async update(id: string, data: Partial<ProductDTO>) {
    await this.productRepository.update({ id }, data);
    return await this.productRepository.findOne({ id });
  }

  async delete(id: string) {
    await this.productRepository.delete({ id });
    return { deleted: true };
  }
}
