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
import { CartItemDTO } from 'src/cart/cart-item.dto';

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

  async createCartItem(cart: CartEntity, data: CartItemDTO) {
    const product = await this.productService.getOne(data.productId);
    const checkCartItem = await this.cartItemRepository.findOne({
      where: { product: { id: product.id }, cart: { id: cart.id } },
    });
    //create new cartItem if product is not in cart
    if (!checkCartItem) {
      const cartItem = this.cartItemRepository.create({
        cart: cart,
        product: product,
        quantity: data.quantity,
      });
      await this.cartItemRepository.save(cartItem);

      return cartItem;
    }

    
    // else add quantity
    await this.cartItemRepository.update(
      { id: checkCartItem.id },
      { ...checkCartItem, quantity: checkCartItem.quantity + data.quantity },
    );
  }

  async deleteCartItem(cartItemId: string) {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: cartItemId },
    });
    if (!cartItem) {
      throw new NotFoundException();
    }
    await this.cartItemRepository.delete({ id: cartItemId });
    return 'cartItem Deleted';
  }
}
