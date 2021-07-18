import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationPipe } from 'src/helpers/validation.pipe';
import { UserModule } from 'src/user/user.module';
import { ProductController } from './product.controller';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), UserModule],
  controllers: [ProductController],
  providers: [ProductService, { provide: APP_PIPE, useClass: ValidationPipe }],
  exports: [ProductService],
})
export class ProductModule {}
