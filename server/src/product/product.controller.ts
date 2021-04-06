import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from '../helpers/validation.pipe';
import { ProductDTO } from './product.dto';
import { ProductService } from './product.service';

@Controller('api/product')
export class ProductController {
  private logger = new Logger('ProductController');
  constructor(private productService: ProductService) {}

  @Get()
  getAllProduct() {
    return this.productService.showAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProduct(@Body() data: ProductDTO) {
    return this.productService.create(data);
  }

  @Get(':id')
  getProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.showOne(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: Partial<ProductDTO>,
  ) {
    return this.productService.update(id, data);
  }

  @Delete(':id')
  removeProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.delete(id);
  }
}
