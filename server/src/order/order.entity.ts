import { Status } from '../enums/status.enum';
import { OrderItemEntity } from '../order-item/order-item.entity';
import { UserEntity } from '../user/user.entity';
import {
  AfterLoad,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() created: Date;

  @UpdateDateColumn() updated: Date;

  @Column('text') note: string;

  @Column('text') status: Status;

  total: number;

  @ManyToOne((type) => UserEntity, (order_user) => order_user.orders)
  order_user: UserEntity;

  @OneToMany((type) => OrderItemEntity, (order_item) => order_item.order, {
    cascade: true,
  })
  order_items: OrderItemEntity[];

  @BeforeInsert()
  async insertStatus() {
    this.status = Status.WaitingForPayment;
  }

  @AfterLoad()
  async setTotal() {
    this.total = 0;

    if (this.order_items) {
      if (this.order_items.length > 0) {
        this.total = this.order_items.reduce(
          (sum, order_item) => sum + order_item.price * order_item.quantity,
          0,
        );
      }
    }
  }
}
