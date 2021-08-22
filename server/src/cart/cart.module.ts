import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './cart.entity';
import { UserModule } from 'src/user/user.module';
import { CartItemModule } from 'src/cart-item/cart-item.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity]), UserModule, CartItemModule],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
