import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from '../role/role.service';
import { Repository } from 'typeorm';
import { UserResponseObject } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly roleService: RoleService,
  ) {}

  toResponseObject(user: UserEntity): UserResponseObject {
    console.log(user);
    const { id, created, username, email, firstname, lastname } = user;

    const responseObject: any = {
      id,
      created,
      username,
      email,
      firstname,
      lastname,
    };
    if (user.roles) {
      const role = user.roles.map(({ name }) => name);

      responseObject.roles = role;
    }

    if (user.products) {
      responseObject.products = user.products;
    }

    if (user.wishlist) {
      responseObject.bookmarks = user.wishlist;
    }
    console.log(responseObject);
    return responseObject;
  }
  async save(user: UserEntity) {
    return this.userRepository.save(user);
  }

  async getAll(): Promise<UserResponseObject[]> {
    const users = await this.userRepository.find({
      relations: ['products', 'wishlist', 'roles'],
    });
    return users.map((user) => this.toResponseObject(user));
  }

  async getOneByEmailOrUsername(
    username: string,
    email: string,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });
    return user;
  }

  async getOne(id: string, asRO: boolean = false) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['products', 'wishlist', 'roles'],
    });
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    if (asRO) {
      this.toResponseObject(user);
    }
    return user;
  }

  async getUserInfo(id: string): Promise<UserResponseObject> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    console.log(user);
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.toResponseObject(user);
  }

  async getUserWishlist(id: string): Promise<any[]> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['wishlist', 'roles'],
    });

    return user.wishlist;
  }

  async getOneWithPassword(username: string): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .where('users.username = :username', { username: username })
      .addSelect(['users.password', 'roles.name'])
      .leftJoin('users.roles', 'roles')
      .getOne();
    if (!user) {
      throw new UnauthorizedException('Invalid username/password');
    }

    return user;
  }

  //user has to re-login
  async updateSellerRole(id: string): Promise<string> {
    let user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const role = await this.roleService.getOneRole('Seller');
    if (user.roles.includes(role)) {
      throw new BadRequestException('Already have seller Role');
    }
    user.roles.push(role);
    await this.userRepository.update({ id }, { roles: [...user.roles, role] });
    return 'Adding Seller Role Success';
  }

  //source: https://wanago.io/2020/10/26/api-nestjs-transactions-postgresql-typeorm/
  // async register(data: UserDto): Promise<UserResponseObject> {
  //   const queryRunner = this.connection.createQueryRunner();
  //   const { username, email } = data;
  //   // let user = await this.userRepository.findOne({where: { email }})
  //   let user = await this.userRepository.findOne({
  //     where: [{ username }, { email }],
  //   });
  //   if (user) {
  //     throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
  //   }
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     //this may cause an error according to the source
  //     const role = await this.roleService.getOneRole('Buyer');
  //     const userData = { ...data, roles: [role] };
  //     user = await queryRunner.manager.create(UserEntity, userData);
  //     await queryRunner.manager.save(user);
  //     await queryRunner.commitTransaction();
  //     return this.toResponseObject(user);
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //     throw new InternalServerErrorException('Error Registering');
  //   } finally {
  //     await queryRunner.release();
  //   }

  // user = this.userRepository.create(data);
  // await this.userRepository.save(user);
  // }
}
