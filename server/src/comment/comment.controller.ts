import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  UsePipes,
  Delete,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/decorator/user.decorator';

import { ValidationPipe } from 'src/helpers/validation.pipe';
import { CommentDTO } from './comment.dto';
import { CommentService } from './comment.service';

@Controller('api/comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('product/:id')
  getCommentsByProduct(@Param('id', ParseUUIDPipe) productId: string) {
    return this.commentService.getCommentsByProduct(productId);
  }

  @Get('user/:id')
  getCommentsByUser(@Param('id', ParseUUIDPipe) userId: string) {
    return this.commentService.getCommmentsByUser(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('product/:id')
  @UsePipes(ValidationPipe)
  createComment(
    @Param('id', ParseUUIDPipe) productId: string,
    @User('userId') userId: string,
    @Body() data: CommentDTO,
  ) {
    return this.commentService.createComment(productId, userId, data);
  }

  @Get(':id')
  getComment(@Param('id', ParseUUIDPipe) commentId: string) {
    return this.commentService.getComment(commentId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteComment(
    @Param('id', ParseUUIDPipe) commentId: string,
    @User('userId') userId: string,
  ) {
    return this.commentService.deleteComment(commentId, userId);
  }
}
