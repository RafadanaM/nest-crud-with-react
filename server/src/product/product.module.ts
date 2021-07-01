import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationPipe } from 'src/helpers/validation.pipe';
import { OrderItemEntity } from 'src/order-item/order-item.entity';
import { OrderItemService } from 'src/order-item/order-item.service';
import { OrderEntity } from 'src/order/order.entity';
import { OrderModule } from 'src/order/order.module';
import { OrderService } from 'src/order/order.service';
import { UserEntity } from 'src/user/user.entity';
import { ProductController } from './product.controller';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      UserEntity,
      OrderEntity,
      OrderItemEntity,
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    OrderItemService,
    OrderService,
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
  exports: [ProductService]
})
export class ProductModule {}
