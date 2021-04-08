import { IsNotEmpty } from 'class-validator';

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
  roles: string;
  token?: string;
}
