import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto, UserResponseObject } from 'src/user/user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Connection } from 'typeorm';
import { RoleService } from 'src/role/role.service';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private jwtService: JwtService,
    private connection: Connection,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<UserResponseObject> | null {
    const user = await this.userService.getOneWithPassword(username);
    if (await this.comparePassword(user.password, pass)) {
      return this.userService.toResponseObject(user);
    }
    return null;
  }

  generateJWTCookie(user: UserResponseObject): string {
    const payload = { username: user.username, id: user.id, roles: user.roles };
    const access_token = this.jwtService.sign(payload);
    return access_token;
  }

  async comparePassword(password: string, attemptedPassword: string) {
    return await bcrypt.compare(attemptedPassword, password);
  }
  async register(data: UserDto): Promise<UserResponseObject> {
    const queryRunner = this.connection.createQueryRunner();
    const { username, email } = data;
    let user = await this.userService.getOneByEmailOrUsername(username, email);
    if (user) {
      throw new BadRequestException('User already exists!');
    }
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //this may cause an error according to the source
      const role = await this.roleService.getOneRole('Buyer');
      const password = await bcrypt.hash(data.password, 10);
      const userData = { ...data, roles: [role], password: password };
      user = await queryRunner.manager.create(UserEntity, userData);
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      return this.userService.toResponseObject(user);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Error Registering');
    } finally {
      await queryRunner.release();
    }

    // user = this.userRepository.create(data);
    // await this.userRepository.save(user);
  }
}
