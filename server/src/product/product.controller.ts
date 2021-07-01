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
import { OrderService } from 'src/order/order.service';
import { ValidationPipe } from '../helpers/validation.pipe';
import { buyDTO, ProductDTO } from './product.dto';
import { ProductService } from './product.service';

@Controller('api/product')
export class ProductController {
  private logger = new Logger('ProductController');
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
  ) {}

  @Get()
  getAllProduct() {
    return this.productService.showAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Buyer', 'Seller')
  @Post()
  @UsePipes(ValidationPipe)
  createProduct(@User('userId') userId: string, @Body() data: ProductDTO) {
    return this.productService.create(userId, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async getAllProductsByUser(@User('userId') userId: string) {
    console.log(userId);
    return this.productService.showAllByUser(userId);
  }

  @Get(':id')
  getProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.showOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Buyer', 'Seller')
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
  @Roles('Buyer', 'Seller')
  @Delete(':id')
  @UsePipes(ValidationPipe)
  removeProduct(
    @User('userId') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.productService.delete(userId, id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post(':id/bookmark')
  @Roles('Buyer', 'Seller')
  @UsePipes(ValidationPipe)
  bookmarkProduct(
    @User('userId') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.productService.bookmark(id, userId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Buyer', 'Seller')
  @Delete(':id/bookmark')
  @UsePipes(ValidationPipe)
  unbookmarkProduct(
    @User('userId') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.productService.unbookmark(id, userId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Buyer', 'Seller')
  @Post(':id/order')
  @UsePipes(ValidationPipe)
  async orderProduct(
    @User('userId') userId: string,
    @Param('id', ParseUUIDPipe) productId: string,
    @Body() data: buyDTO,
  ) {
    const test = await this.orderService.test(userId, data, productId);

    return { message: 'success' };
  }
}
