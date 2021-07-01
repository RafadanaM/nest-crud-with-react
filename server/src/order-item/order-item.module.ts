import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/order/order.entity';
import { ProductEntity } from 'src/product/product.entity';
import { OrderItemEntity } from './order-item.entity';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItemEntity, OrderEntity, ProductEntity]),
  ],
  providers: [OrderItemService],
  controllers: [OrderItemController],
})
export class OrderItemModule {}
