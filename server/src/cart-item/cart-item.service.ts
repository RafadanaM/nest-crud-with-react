import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from 'src/cart/cart.entity';
import { CartService } from 'src/cart/cart.service';
import { OrderItemDTO } from 'src/order-item/order-item.dto';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CartItemEntity } from './cart-item.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItemEntity)
    private cartItemRepository: Repository<CartItemEntity>,
    private readonly productService: ProductService, //private readonly userService: UserService
  ) {}

  async createCartItem(
    productId: string,
    cart: CartEntity,
    data: OrderItemDTO,
  ) {
    const product = await this.productService.getOne(productId);
    const cartItem = this.cartItemRepository.create({
      cart: cart,
      product: product,
      quantity: data.quantity,
    });
    await this.cartItemRepository.save(cartItem);

    return cartItem;
  }
}
