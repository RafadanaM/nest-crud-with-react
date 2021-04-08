import { forwardRef, Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { ValidationPipe } from 'src/helpers/validation.pipe';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, { provide: APP_PIPE, useClass: ValidationPipe }],
  exports: [UserService],
})
export class UserModule {}
