import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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

  @ManyToOne((type) => UserEntity, (creator) => creator.products)
  creator: UserEntity;
}
