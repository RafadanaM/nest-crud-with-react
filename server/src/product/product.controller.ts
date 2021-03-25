import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductDTO } from './product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAllProduct() {
    return this.productService.showAll();
  }

  @Post()
  createProduct(@Body() data: ProductDTO) {
    return this.productService.create(data);
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productService.showOne(id);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() data: Partial<ProductDTO>) {
    return this.productService.update(id, data);
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
