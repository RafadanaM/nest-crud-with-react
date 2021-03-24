import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAllProduct() {}

  @Post()
  createProduct() {}

  @Get(':id')
  getProduct() {}

  @Put()
  updateProduct() {}

  @Delete(':id')
  removeProduct() {}
}
