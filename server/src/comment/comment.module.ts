import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { identity } from 'rxjs';
import { ValidationPipe } from 'src/helpers/validation.pipe';
import { ProductEntity } from 'src/product/product.entity';
import { UserEntity } from 'src/user/user.entity';
import { CommentController } from './comment.controller';
import { CommentEntity } from './comment.entity';
import { CommentService } from './comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, UserEntity, CommentEntity]),
  ],
  controllers: [CommentController],
  providers: [CommentService, { provide: APP_PIPE, useClass: ValidationPipe }],
})
export class CommentModule {}
