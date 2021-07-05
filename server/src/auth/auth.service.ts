import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    pass: string,
  ): Promise<UserResponseObject> | null {
    console.log('MASUK SINI');

    const user = await this.userService.findOne(username);
    if (await user.comparePassword(pass)) {
      return user.toResponseObject();
    }
    return null;
  }

  generateJWTCookie(user: UserResponseObject): string {
    const payload = { username: user.username, id: user.id, roles: user.roles };
    const access_token = this.jwtService.sign(payload);
    return access_token;
  }
}
