import { CartItemEntity } from '../cart-item/cart-item.entity';
import { UserEntity } from '../user/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() created: Date;

  @UpdateDateColumn() updated: Date;

  @OneToOne((type) => UserEntity, (user) => user.cart, { eager: true })
  @JoinColumn()
  cart_user: UserEntity;

  @OneToMany((type) => CartItemEntity, (cart_item) => cart_item.cart, {
    cascade: true,
  })
  cart_items: CartItemEntity[];
}
