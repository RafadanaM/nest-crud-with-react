import {
  IsAlpha,
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
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
  @Length(6, 255)
  @IsAlphanumeric()
  password: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Matches(/^[a-zA-Z ]{1,30}$/, {
    message: '$property must contain only letters',
  })
  @IsNotEmpty()
  firstname: string;

  @Matches(/^[a-zA-Z ]{1,30}$/, {
    message: '$property must contain only letters',
  })
  @IsNotEmpty()
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
