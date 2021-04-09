import { IsNumber, IsString } from 'class-validator';
import { UserResponseObject } from 'src/user/user.dto';

export class ProductDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;
}

export class ProductResponseObject {
  id?: string;
  createdDate: Date;
  updated: Date;
  price: number;
  name: string;
  description: string;
  creator: UserResponseObject;
}
