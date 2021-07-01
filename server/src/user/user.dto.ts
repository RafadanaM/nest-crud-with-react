import { IsNotEmpty } from 'class-validator';
import { ProductEntity } from 'src/product/product.entity';
import { RoleEntity } from 'src/role/role.entity';

export class UserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  email: string;
}

export class UserResponseObject {
  id: string;
  username: string;
  created: Date;
  roles: string[];
  email: string;
  token?: string;
  bookmarks?: ProductEntity[];
}
