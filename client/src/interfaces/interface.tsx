import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { ReactElement } from "react";

// export interface Role {
//   id: number;
//   name: string;
// }
export interface UserInfo {
  id: string;
  created: Date;
  username: string;
  roles: string[];
  email: string;
  bookmarks: Product[];
}

export interface User {
  id: string;
  username: string;
  created: Date;
  roles: string[];
  email: string;
  token?: string;
  products?: Product[];
  bookmarks?: Product[];
}

export interface Product {
  name: string;
  created: Date;
  creator: UserInfo;
  description: string;
  id: string;
  price: string;
  rating: string;
  sold: number;
  stock: number;
  updated: Date;
  weight: string;
  width: string;
  length: string;
  height: string;
}

export interface ProductUpdate {
  name: string;

  description: string;

  price: number;

  stock: number;

  weight: number;

  length: number;

  width: number;

  height: number;
}

export interface OrderI {
  id: string;
  created: Date;
  updated: Date;
  note: string;
  status: string;
  total: number;
  order_user: User;
  order_items: OrderItem[];
}

export interface OrderItem {
  id: string;
  name: string;
  sellerName: string;
  createdDate: Date;
  description: string;
  price: string;
  updated: Date;
  weight: string;
  width: string;
  length: string;
  height: string;
  quantity: number;
  status: string;
  product: Product | null;
}

export interface IconText {
  name: string;
  icon: ReactElement;
  path: string;
}
