import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  Param,
  ParseUUIDPipe,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { Roles } from 'src/decorator/roles.decorator';
import { User } from 'src/decorator/user.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/helpers/roles.guard';
import { ValidationPipe } from 'src/helpers/validation.pipe';
import { OrderItemService } from 'src/order-item/order-item.service';
import { OrderService } from 'src/order/order.service';
import { UserDto, UserResponseObject } from './user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('api/user')
  getAllUser() {
    return this.userService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('api/user/wishlist')
  getUserWishlist(@User('userId') id: string) {
    return this.userService.getUserWishlist(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('api/user/seller')
  addUserSeller(@User('userId') id: string) {
    return this.userService.updateSellerRole(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('api/user/:id')
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('api/userInfo')
  getUserInfo(@User('userId') id: string) {
    return this.userService.getUserInfo(id);
  }

  @UseGuards(AuthGuard('local'))
  @Post('api/login')
  @UsePipes(ValidationPipe)
  login(@User() user: UserResponseObject, @Res() response: Response) {
    const access_token = this.authService.generateJWTCookie(user);
    response.cookie('access_token', access_token, {
      expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      sameSite: 'strict',
      httpOnly: true,
      path: '/',
    });
    return response.send(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('api/logout')
  logout(@Res() response: Response) {
    response.clearCookie('access_token');
    return response.sendStatus(200);
  }

  @Post('api/register')
  @UsePipes(ValidationPipe)
  register(@Body() data: UserDto) {
    return this.userService.register(data);
  }
}
