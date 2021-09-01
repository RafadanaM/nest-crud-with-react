import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from '../product/product.service';
import { Repository } from 'typeorm';
import { CartItemEntity } from './cart-item.entity';
import { CartItemDTO } from 'src/cart/cart-item.dto';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItemEntity)
    private cartItemRepository: Repository<CartItemEntity>,
    private readonly productService: ProductService, //private readonly userService: UserService
    private readonly cartService: CartService,
  ) {}

  private isOwned(cartItemId: string, userId: string) {
    if (cartItemId !== userId) {
      throw new ForbiddenException();
    }
  }

  async createCartItem(userId: string, data: CartItemDTO) {
    const cart = await this.cartService.getOneCart(userId);
    const product = await this.productService.getOne(data.productId);
    const checkCartItem = await this.cartItemRepository.findOne({
      where: {
        product: { id: product.id },
        cart: { cart_user: { id: userId } },
      },
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

  async deleteCartItem(userId: string, cartItemId: string) {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: cartItemId },
      relations: ['cart'],
    });
    if (!cartItem) {
      throw new NotFoundException();
    }
    this.isOwned(cartItem.cart.cart_user.id, userId);
    await this.cartItemRepository.delete({ id: cartItemId });
    return 'cartItem Deleted';
  }

  async editCartItem(
    userId: string,
    cartItemId: string,
    data: Partial<CartItemDTO>,
  ) {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: cartItemId },
      relations: ['cart'],
    });
    if (!cartItem) {
      throw new NotFoundException();
    }
    this.isOwned(cartItem.cart.cart_user.id, userId);
    await this.cartItemRepository.update(
      { id: cartItemId },
      { ...cartItem, quantity: data.quantity },
    );
    const newCartItem = await this.cartItemRepository.findOne({
      where: { id: cartItemId },
    });
    return newCartItem;
  }
}
