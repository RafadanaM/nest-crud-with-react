import { CartEntity } from '../cart/cart.entity';
import { ProductEntity } from '../product/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CartItemEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() created: Date;

  @UpdateDateColumn() updated: Date;

  @Column('integer') quantity: number;

  @ManyToOne((type) => ProductEntity, (product) => product.cart_items, {
    onDelete: 'SET NULL',
  })
  product: ProductEntity;

  @ManyToOne((type) => CartEntity, (cart) => cart.cart_items, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  cart: CartEntity;
}
