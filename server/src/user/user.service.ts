import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto, UserResponseObject } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserResponseObject[]> {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponseObject());
  }

  async findOne(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  async login(data: UserDto): Promise<UserResponseObject> {
    const { username, password } = data;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user.toResponseObject();
  }

  async register(data: UserDto): Promise<UserResponseObject> {
    const { username, email } = data;
    // let user = await this.userRepository.findOne({where: { email }})
    let user = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user = this.userRepository.create(data);
    await this.userRepository.save(user);
    return user.toResponseObject();
  }
}
