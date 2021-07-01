import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderItemEntity } from 'src/order-item/order-item.entity';
import { ProductEntity } from 'src/product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity, OrderItemEntity, ProductEntity])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
