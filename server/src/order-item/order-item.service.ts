import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { OrderAction } from 'src/enums/action.enum';
import { Status } from 'src/enums/status.enum';
import { OrderEntity } from 'src/order/order.entity';
import { OrderService } from 'src/order/order.service';
import { ProductDTO } from 'src/product/product.dto';
import { ProductEntity } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { OrderItemDTO } from './order-item.dto';
import { OrderItemEntity } from './order-item.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItemEntity)
    private orderItemRepository: Repository<OrderItemEntity>,
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
  ) {}

  private isOwned(orderItem: OrderItemEntity, userId: string) {
    if (orderItem.seller.id !== userId) {
      throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
    }
  }

  async getAllBySeller(userId: string) {
    const orderItems = await this.orderItemRepository.find({
      where: { seller: userId },
      relations: ['order', 'seller'],
    });
    return orderItems;
  }

  async createOrderItem(
    orderId: string,
    productId: string,
    data: OrderItemDTO,
  ) {
    const order = await this.orderService.getOne(orderId);

    const product = await this.productService.getOne(productId);

    const quantity = product.stock - data.quantity;
    if (quantity < 0) {
      throw new BadRequestException('Stock is empty');
    }

    await this.productService.update(product.creator.id, productId, {
      stock: quantity,
    });

    const orderItem = await this.orderItemRepository.create({
      ...data,
      price: product.price,
      name: product.name,
      description: product.description,
      weight: product.weight,
      length: product.length,
      width: product.width,
      height: product.height,
      seller: product.creator,
      order,
      product,
    });

    await this.orderItemRepository.save(orderItem);
    return orderItem;
  }

  async sellerAction(orderItemId: string, userId: string, action: OrderAction) {
    const orderItem = await this.orderItemRepository.findOne({
      where: { id: orderItemId },
      relations: ['order', 'seller'],
    });

    if (!orderItem) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    this.isOwned(orderItem, userId);
    let updatedStatus: Status;
    let currentStatus: Status;
    switch (action) {
      case OrderAction.Confirm:
        currentStatus = Status.WaitingForSeller;
        updatedStatus = Status.WaitingForDelivery;
        break;
      case OrderAction.Send:
        currentStatus = Status.WaitingForDelivery;
        updatedStatus = Status.Delivering;
        break;

      default:
        throw new BadRequestException('Invalid Action');
    }

    await this.orderItemRepository.update(
      { id: orderItemId },
      { status: updatedStatus },
    );

    const order = await this.orderService.getOne(orderItem.order.id);

    order.status = updatedStatus;
    order.order_items.forEach((x) => {
      if (x.status === currentStatus) {
        order.status = currentStatus;
      }
    });
    await this.orderService.update(order.id, order.order_user.id, order);
    // await this.orderRepository.save(order);

    return `${currentStatus} changed to ${updatedStatus}`;
  }

  async getByStatus(userId: string, status: Status) {
    if (!Object.values(Status).includes(status)) {
      throw new BadRequestException('Invalid Status');
    }
    let orderItems: any;
    if (status === Status.All) {
      orderItems = await this.orderItemRepository.find({
        relations: ['seller'],
        where: {
          seller: { id: userId },
        },
      });
    } else {
      orderItems = await this.orderItemRepository.find({
        relations: ['seller'],
        where: { status: status, seller: { id: userId } },
      });
    }

    return orderItems;
  }
}
