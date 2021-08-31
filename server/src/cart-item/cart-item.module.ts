import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemEntity } from './cart-item.entity';
import { ProductModule } from 'src/product/product.module';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItemEntity]),
    ProductModule,
    CartModule,
  ],
  providers: [CartItemService],
  controllers: [CartItemController],
  exports: [],
})
export class CartItemModule {}
