import {
  AfterLoad,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserResponseObject } from './user.dto';

import { ProductEntity } from 'src/product/product.entity';
import { OrderEntity } from 'src/order/order.entity';
import { RoleEntity } from 'src/role/role.entity';

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  // @BeforeInsert()
  // async insertRole() {
  //   this.roles = Role.User;
  // }

  toResponseObject(showToken: boolean = true): UserResponseObject {
    const { id, created, username, email, firstname, lastname } = this;

    const responseObject: any = {
      id,
      created,
      username,
      email,
      firstname,
      lastname,
    };
    if (this.roles) {
      const role = this.roles.map(({ name }) => name);

      responseObject.roles = role;
    }

    if (this.products) {
      responseObject.products = this.products;
    }

    if (this.wishlist) {
      responseObject.bookmarks = this.wishlist;
    }

    return responseObject;
  }

  async comparePassword(attemptPassword: string) {
    console.log(attemptPassword);
    console.log(this.password);

    return await bcrypt.compare(attemptPassword, this.password);
  }

  // private get token() {
  //   const { id, username } = this;
  //   return jwt.sign({ id, username }, process.env.JWT_SECRET, {
  //     expiresIn: '7d',
  //   });
  // }

  // @AfterLoad()
  // async getProduct() {
  //   console.log(this.products);
  // }
}
