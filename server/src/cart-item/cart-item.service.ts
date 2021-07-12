import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CartItemEntity } from './cart-item.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItemEntity)
    private cartItemRepository: Repository<CartItemEntity>,
    private readonly cartService: CartService,
    private readonly productService: ProductService, //private readonly userService: UserService
  ) {}

  async createCartItem(productId: string, userId: string) {
    //const user = this.userService.getOneUser(userId)

    const cart = await this.cartService.getOneCart(userId);
    const product = await this.productService.getOne(productId);
    const cartItem = this.cartItemRepository.create({
      cart: cart,
      product: product,
      quantity: 2,
    });
    await this.cartItemRepository.save(cartItem);
    return cartItem;
  }
}
