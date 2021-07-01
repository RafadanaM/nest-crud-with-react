import { IsNumber, IsString } from 'class-validator';

export class OrderDTO {
  @IsString()
  note: string;
}
