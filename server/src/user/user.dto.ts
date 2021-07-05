import {
  IsAlpha,
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { ProductEntity } from 'src/product/product.entity';
import { RoleEntity } from 'src/role/role.entity';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  @IsAlphanumeric()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 255)
  @IsAlphanumeric()
  password: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  lastname: string;
}

export class UserResponseObject {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  created: Date;
  roles: string[];
  email: string;
  token?: string;
  bookmarks?: ProductEntity[];
}
