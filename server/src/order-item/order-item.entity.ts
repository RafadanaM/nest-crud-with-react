import { Status } from '../enums/status.enum';

import { OrderEntity } from '../order/order.entity';
import { ProductEntity } from '../product/product.entity';
import { UserEntity } from '../user/user.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('order_item')
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() createdDate: Date;

  @UpdateDateColumn() updated: Date;

  @Column('decimal') price: number;

  @Column('text') name: string;

  @Column('text') sellerName: string;

  @Column('text') description: string;

  @Column('text') status: Status;

  @Column('decimal', { default: 0.0 }) weight: number;

  @Column('decimal', { default: 0.0 }) length: number;

  @Column('decimal', { default: 0.0 }) width: number;

  @Column('decimal', { default: 0.0 }) height: number;

  @Column('integer') quantity: number;

  @ManyToOne((type) => ProductEntity, (product) => product.order_items, {
    onDelete: 'SET NULL',
  })
  product: ProductEntity;

  @ManyToOne((type) => OrderEntity, (order) => order.order_items, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: OrderEntity;

  @ManyToOne((type) => UserEntity)
  seller: UserEntity;

  @BeforeInsert()
  async insertStatus() {
    this.status = Status.WaitingForPayment;
  }
}
