import { Controller, Post } from '@nestjs/common';

@Controller('api/products')
export class ProductController {
  @Post()
  createProduct(): any {}
}
