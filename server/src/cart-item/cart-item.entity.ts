import { CartEntity } from 'src/cart/cart.entity';
import { ProductEntity } from 'src/product/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class cartItemEntity {
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
