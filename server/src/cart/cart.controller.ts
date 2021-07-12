import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('api/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  createNewOrder() {
    return this.cartService.createCart('f86fed85-2cfd-46c8-a71b-87b2b0dd5cce');
  }

  @Get()
  getOneCart() {
    return this.cartService.getOneCart('f86fed85-2cfd-46c8-a71b-87b2b0dd5cce');
  }
}
