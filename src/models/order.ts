import { Dish } from './dish';

export interface OrderItem {
  id: string;
  dish: Dish;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
}
