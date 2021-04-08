import { Injectable } from '@nestjs/common';
import { UserDto, UserResponseObject } from 'src/user/user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserResponseObject> | null {
    const user = await this.userService.findOne(username);
    if (user && (await user.comparePassword(password))) {
      return user.toResponseObject();
    }
    return null;
  }

  async login(user: UserResponseObject) {
    const payload = { username: user.username, id: user.id, roles: user.roles };
    return { user: user, access_token: this.jwtService.sign(payload) };
  }
}
