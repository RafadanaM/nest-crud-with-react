import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/helpers/roles.guard';
import { ValidationPipe } from 'src/helpers/validation.pipe';
import { UserDto } from './user.dto';
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

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Request() req: any) {
    // return this.userService.login(data);
    return this.authService.login(req.user);
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  register(@Body() data: UserDto) {
    return this.userService.register(data);
  }
}
