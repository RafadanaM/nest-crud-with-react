import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CartEntity } from './cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    private readonly userService: UserService,
  ) {}

  async getOneCart(userId: string) {
    const cart = await this.cartRepository.findOne({
      where: { cart_user: { id: userId } },
    });

    if (!cart) {
      throw new NotFoundException('Cart Not Found');
    }
    return cart;
  }

  async createCart(userId: string) {
    const cart = await this.cartRepository.findOne({
      where: { cart_user: { id: userId } },
    });

    if (cart) {
      throw new BadRequestException('User already has a cart');
    }

    const user = await this.userService.getOneUser(userId);
    console.log(user);

    const newCart = await this.cartRepository.create({ cart_user: user });

    await this.cartRepository.save(newCart);

    return newCart;
  }
}
