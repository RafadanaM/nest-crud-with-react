import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CommentDTO } from './comment.dto';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async getCommentsByProduct(id: string) {
    // const product = await this.productRepository.findOne({
    //   where: { id },
    //   relations: ['comments', 'comments.author', 'comments.product'],
    // });
    const comments = await this.commentRepository.find({
      where: { product: id },
      relations: ['author', 'product'],
      order: { created: 'ASC' },
    });

    return comments;
  }

  async getCommmentsByUser(id: string) {
    const comments = await this.commentRepository.find({
      where: { author: { id } },
      relations: ['author'],
    });

    return comments;
  }

  async getComment(id: string): Promise<CommentEntity> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author', 'product'],
    });
    return comment;
  }

  async createComment(productId: string, userId: string, data: CommentDTO) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const comment = this.commentRepository.create({
      ...data,
      product,
      author: user,
    });
    await this.commentRepository.save(comment);
    return comment;
  }

  async deleteComment(commentId: string, userId: string) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['author', 'product'],
    });
    if (comment.author.id !== userId) {
      throw new HttpException(
        'You do not own this comment',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.commentRepository.remove(comment);
    return comment;
  }
}
