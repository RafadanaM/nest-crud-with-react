import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('increment') id: number;

  @CreateDateColumn() createdDate: Date;

  @Column('decimal') price: number;

  @Column('text') name: string;

  @Column('text') description: string;
}
