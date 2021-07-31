import {
  AfterLoad,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { UserResponseObject } from './user.dto';

import { ProductEntity } from '../product/product.entity';
import { OrderEntity } from '../order/order.entity';
import { RoleEntity } from '../role/role.entity';
import { CartEntity } from '../cart/cart.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() created: Date;

  @Column({ length: 255, unique: true }) username: string;

  @Column({ length: 255, select: false }) password: string;

  @Column({ length: 255 }) email: string;

  @Column({ length: 255 }) firstname: string;

  @Column({ length: 255 }) lastname: string;

  @ManyToMany(() => RoleEntity)
  @JoinTable()
  roles: RoleEntity[];

  @OneToMany((type) => ProductEntity, (product) => product.creator)
  products: ProductEntity[];

  @OneToMany((type) => OrderEntity, (order) => order.order_user, {
    cascade: true,
  })
  orders: OrderEntity[];

  @ManyToMany((type) => ProductEntity, { cascade: true })
  @JoinTable()
  wishlist: ProductEntity[];

  @OneToOne((type) => OrderEntity, (order) => order.order_user, {
    cascade: true,
  })
  cart: CartEntity;

  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await bcrypt.hash(this.password, 10);
  // }

  // toResponseObject(): UserResponseObject {
  //   const { id, created, username, email, firstname, lastname } = this;

  //   const responseObject: any = {
  //     id,
  //     created,
  //     username,
  //     email,
  //     firstname,
  //     lastname,
  //   };
  //   if (this.roles) {
  //     const role = this.roles.map(({ name }) => name);

  //     responseObject.roles = role;
  //   }

  //   if (this.products) {
  //     responseObject.products = this.products;
  //   }

  //   if (this.wishlist) {
  //     responseObject.bookmarks = this.wishlist;
  //   }

  //   return responseObject;
  // }
}
