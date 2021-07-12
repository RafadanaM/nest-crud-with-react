import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemEntity } from './cart-item.entity';
import { CartService } from 'src/cart/cart.service';
import { UserService } from 'src/user/user.service';
import { ProductModule } from 'src/product/product.module';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItemEntity]),
    CartModule,
    ProductModule,
  ],
  providers: [CartItemService],
  controllers: [CartItemController],
})
export class CartItemModule {}
