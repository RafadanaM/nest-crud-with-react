import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserResponseObject } from './user.dto';
import { Role } from 'src/enums/role.enum';
import { ProductEntity } from 'src/product/product.entity';
import { type } from 'node:os';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() created: Date;

  @Column({ length: 255, unique: true }) username: string;

  @Column({ length: 255 }) password: string;

  @Column({ length: 255 }) email: string;

  @Column() roles: Role;

  @OneToMany((type) => ProductEntity, (product) => product.creator)
  products: ProductEntity[];

  //   @Column('date') birthDate: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeInsert()
  async insertRole() {
    this.roles = Role.User;
  }

  toResponseObject(showToken: boolean = true): UserResponseObject {
    const { id, created, username, roles } = this;
    const responseObject: any = { id, created, username, roles };
    if (showToken) {
      // responseObject.token = token;
    }
    if (this.products) {
      responseObject.products = this.products;
    }
    return responseObject;
  }

  async comparePassword(attemptPassword: string) {
    return await bcrypt.compare(attemptPassword, this.password);
  }

  // private get token() {
  //   const { id, username } = this;
  //   return jwt.sign({ id, username }, process.env.JWT_SECRET, {
  //     expiresIn: '7d',
  //   });
  // }
}
