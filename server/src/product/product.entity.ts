import { type } from 'node:os';
import { cartItemEntity } from 'src/cart-item/cart-item.entity';
import { CommentEntity } from 'src/comment/comment.entity';
import { OrderItemEntity } from 'src/order-item/order-item.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() createdDate: Date;

  @UpdateDateColumn() updated: Date;

  @Column('decimal') price: number;

  @Column('text') name: string;

  @Column('text') description: string;

  @Column('decimal', { default: 0.0 }) rating: number;

  @Column('integer', { default: 0 }) stock: number;

  @Column('integer', { default: 0 }) sold: number;

  @Column('decimal', { default: 0.0 }) weight: number;

  @Column('decimal', { default: 0.0 }) length: number;

  @Column('decimal', { default: 0.0 }) width: number;

  @Column('decimal', { default: 0.0 }) height: number;

  @ManyToOne((type) => UserEntity, (creator) => creator.products)
  creator: UserEntity;

  @OneToMany((type) => CommentEntity, (comment) => comment.product, {
    cascade: true,
  })
  comments: CommentEntity[];

  @OneToMany((type) => OrderItemEntity, (order_item) => order_item.product)
  order_items: OrderItemEntity[];

  @OneToMany((type) => cartItemEntity, (order_item) => order_item.product)
  cart_items: OrderItemEntity[];
}
