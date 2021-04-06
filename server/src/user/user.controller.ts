import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('api/user')
  getAllUser() {
    return this.userService.getAll();
  }

  @Post('login')
  login(@Body() data) {
    return this.userService.login(data);
  }

  @Post('register')
  register(@Body() data) {
    return this.userService.register(data);
  }
}
