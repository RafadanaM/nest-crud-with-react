import { CartEntity } from 'src/cart/cart.entity';
import { OrderEntity } from 'src/order/order.entity';
import { ProductEntity } from 'src/product/product.entity';
import { RoleEntity } from 'src/role/role.entity';
import { UserEntity } from './user.entity';

export const users: UserEntity[] = [
  {
    id: '1dd8c748-6505-4714-b527-4c0f471fe2cb',
    username: 'username',
    password: 'password',
    created: new Date('2021-05-25 13:42:05.800251'),
    email: 'email@email.com',
    firstname: 'firstname',
    lastname: 'lastname',
    orders: [],
    products: [],
    roles: [],
    cart: null,
    wishlist: [],
  },
];
