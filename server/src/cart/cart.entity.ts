import { CartItemEntity } from 'src/cart-item/cart-item.entity';
import { UserEntity } from 'src/user/user.entity';
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

  @OneToOne((type) => UserEntity, (user) => user.cart)
  @JoinColumn()
  cart_user: UserEntity;

  @OneToMany((type) => CartItemEntity, (cart_item) => cart_item.cart, {
    eager: true,
    cascade: true,
  })
  cart_items: CartItemEntity[];
}
