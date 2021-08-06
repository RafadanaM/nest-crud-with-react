import { UserEntity } from '../user.entity';

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
