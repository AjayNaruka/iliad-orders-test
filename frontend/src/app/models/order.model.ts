import { Product } from "./product.model";

export interface Order {
  order_id: number;
  product_name: string;
  product_price: number;  
  creation_date: string;
  product_data : Product
}