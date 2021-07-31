import { users } from '../../user/user.mock';
import { ProductEntity } from '../product.entity';

export const products: ProductEntity[] = [
  {
    id: 'db1e9ba3-e99e-4031-a81e-c270f66caee0',
    createdDate: new Date('2021-05-25 13:42:05.800251'),
    updated: new Date('2021-07-13 12:11:26.639503'),
    price: 100,
    name: 'product1',
    description: 'desc',
    weight: 1,
    width: 1,
    length: 1,
    height: 1,
    rating: 5,
    stock: 1,
    sold: 2,
    creator: users[0],
    cart_items: [],
    comments: [],
    order_items: [],
  },
];

export const productDataMock: ProductEntity = {
  id: 'db1e9ba3-e99e-4031-a81e-c270f66caee0',
  createdDate: new Date('2021-05-25 13:42:05.800251'),
  updated: new Date('2021-07-13 12:11:26.639503'),
  price: 100,
  name: 'product1',
  description: 'desc',
  weight: 1,
  width: 1,
  length: 1,
  height: 1,
  rating: 5,
  stock: 1,
  sold: 2,
  creator: users[0],
  cart_items: [],
  comments: [],
  order_items: [],
};
