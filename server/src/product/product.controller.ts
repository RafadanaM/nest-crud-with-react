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
  UseGuards,
  UsePipes,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { User } from 'src/decorator/user.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/helpers/roles.guard';
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

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.User)
  @Post()
  @UsePipes(ValidationPipe)
  createProduct(@User('userId') userId: string, @Body() data: ProductDTO) {
    return this.productService.create(userId, data);
  }

  @Get(':id')
  getProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.showOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.User)
  @Put(':id')
  @UsePipes(ValidationPipe)
  updateProduct(
    @User('userId') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: Partial<ProductDTO>,
  ) {
    return this.productService.update(userId, id, data);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.User)
  @Delete(':id')
  removeProduct(
    @User('userId') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.productService.delete(userId, id);
  }
}
