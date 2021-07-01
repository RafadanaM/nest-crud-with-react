import { forwardRef, Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ValidationPipe } from 'src/helpers/validation.pipe';
import { RoleModule } from 'src/role/role.module';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
    RoleModule,
  ],
  controllers: [UserController],
  providers: [UserService, { provide: APP_PIPE, useClass: ValidationPipe }],
  exports: [UserService],
})
export class UserModule {}
