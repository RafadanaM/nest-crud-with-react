import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from '../cart/cart.entity';
import { OrderItemDTO } from '../order-item/order-item.dto';
import { ProductService } from '../product/product.service';
import { Repository } from 'typeorm';
import { CartItemEntity } from './cart-item.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItemEntity)
    private cartItemRepository: Repository<CartItemEntity>,
    private readonly productService: ProductService, //private readonly userService: UserService
  ) {}

  private isOwned(cartItem: CartItemEntity, userId: string) {
    if (cartItem.cart.cart_user.id !== userId) {
      throw new ForbiddenException();
    }
  }

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

  async deleteCartItem(cartItemId: string) {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: cartItemId },
      relations: ['cart'],
    });
    if (!cartItem) {
      throw new NotFoundException();
    }
    await this.cartItemRepository.delete({ id: cartItemId });
    return 'cartItem Deleted';
  }
}
