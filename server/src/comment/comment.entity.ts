import { ProductEntity } from '../product/product.entity';
import { UserEntity } from '../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column()
  comment: string;

  @ManyToOne((type) => UserEntity)
  @JoinColumn()
  author: UserEntity;

  @ManyToOne((type) => ProductEntity, (product) => product.comments)
  product: ProductEntity;
}
