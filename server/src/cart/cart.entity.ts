import { cartItemEntity } from 'src/cart-item/cart-item.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  CreateDateColumn,
  Entity,
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

  @OneToOne((type) => UserEntity, (user) => user.cart) cart_user: UserEntity;

  @OneToMany((type) => cartItemEntity, (cart_item) => cart_item.cart, {
    cascade: true,
  })
  cart_items: cartItemEntity[];
}
