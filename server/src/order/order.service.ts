import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/enums/role.enum';
import { Status } from 'src/enums/status.enum';
import { OrderItemEntity } from 'src/order-item/order-item.entity';
import { buyDTO } from 'src/product/product.dto';
import { ProductEntity } from 'src/product/product.entity';

import { UserEntity } from 'src/user/user.entity';
import { Connection, Repository, Transaction } from 'typeorm';
import { OrderDTO } from './order.dto';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(OrderItemEntity)
    private orderItemRepository: Repository<OrderItemEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private connection: Connection,
  ) {}

  private isOwned(order: OrderEntity, userId: string) {
    if (order.order_user.id !== userId) {
      throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
    }
  }

  async getAll() {
    const orders = await this.orderRepository.find({
      relations: ['order_user', 'order_items'],
    });

    return orders;
  }

  async getOne(orderId: string, userId: string, role: Role) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['order_user', 'order_items'],
    });
    if (role === Role.User) {
      this.isOwned(order, userId);
    }
    return order;
  }

  async getAllByUser(userId: string, role: string, status: Status) {
    if (!Object.values(Status).includes(status)) {
      throw new BadRequestException('Invalid Status');
    }
    let orders: any;
    if (status === Status.All) {
      orders = await this.orderRepository.find({
        where: { order_user: { id: userId } },
        relations: ['order_user', 'order_items', 'order_items.product'],
      });
    } else {
      orders = await this.orderRepository.find({
        where: { order_user: { id: userId }, status },
        relations: ['order_user', 'order_items', 'order_items.product'],
      });
    }

    //check if there's order and the one requesting is user(admin dont need to check ownership)
    // if (orders.length > 0 && role === Role.User) {
    //   this.isOwned(orders[0], userId);
    // }

    return orders;
  }

  async test(userId: string, data: buyDTO, productId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['creator'],
    });
    if (!user || !product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await this.connection.transaction(async (manager) => {
      const orderRepo = manager.getRepository<OrderEntity>('OrderEntity');
      const productRepo = manager.getRepository<ProductEntity>('ProductEntity');
      const OrderItemRepo = manager.getRepository<OrderItemEntity>(
        'OrderItemEntity',
      );
      const order = await orderRepo.create({
        ...data.order,
        order_user: user,
      });
      await orderRepo.save(order);
      const quantity = product.stock - data.item.quantity;
      if (quantity < 0) {
        throw new BadRequestException('Stock is empty');
      }
      await productRepo.update(
        { id: productId },
        { stock: quantity, sold: product.stock + 1 },
      );
      const orderItem = await OrderItemRepo.create({
        ...data.item,
        price: product.price,
        name: product.name,
        description: product.description,
        weight: product.weight,
        length: product.length,
        width: product.width,
        height: product.height,
        sellerName: product.creator.username,
        seller: product.creator,
        order,
        product,
      });
      await OrderItemRepo.save(orderItem);
    });

    // const orderData = data.order
    // const order = await this.orderRepository.create({
    //   ...data.order,
    //   order_user: user,
    // });
    // await this.orderRepository.save(order);

    // const product = await this.productRepository.findOne({
    //   where: { id: productId },
    //   relations: ['creator'],
    // });

    // if (!product || !order) {
    //   throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    // }
    // const quantity = product.stock - data.item.quantity;
    // if (quantity < 0) {
    //   throw new BadRequestException('Stock is empty');
    // }
    // await this.productRepository.update({ id: productId }, { stock: quantity });
    // const orderItem = await this.orderItemRepository.create({
    //   ...data,
    //   price: product.price,
    //   name: product.name,
    //   description: product.description,
    //   weight: product.weight,
    //   length: product.length,
    //   width: product.width,
    //   height: product.height,
    //   seller: product.creator,
    //   order,
    //   product,
    // });

    // await this.orderItemRepository.save(orderItem);
    //console.log(order.id)
    // const newOrder = await this.orderRepository.findOne({where: {id: order.id}})

    return user;
  }

  //change this
  async create(userId: string, data: OrderDTO) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const order = await this.orderRepository.create({
      ...data,
      order_user: user,
    });
    await this.orderRepository.save(order);
    return order;
  }

  async update(orderId: string, userId: string, data: Partial<OrderDTO>) {
    let order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['order_user'],
    });

    if (!order) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    this.isOwned(order, userId);
    await this.orderRepository.update({ id: orderId }, data);

    order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['order_user', 'order_items'],
    });

    return order;
  }

  async delete(orderId: string, userId: string) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['order_user'],
    });

    if (!order) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.isOwned(order, userId);
    await this.orderRepository.delete({ id: orderId });
    return order;
  }

  async changeOrderStatus(orderId: string, userId: string, status: Status) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['order_user', 'order_items'],
    });

    if (!order) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    this.isOwned(order, userId);
    const order_items = await Promise.all(
      order.order_items.map((order_item) => {
        order_item.status = status;
        return order_item;
      }),
    );
    console.log(order_items);
    order.status = status;
    await this.orderRepository.save(order);

    return 'success';
  }
}
