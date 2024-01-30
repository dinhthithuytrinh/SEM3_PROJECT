import { Address } from './User';

export interface IOrderToCreate {
  basketId: string;
  deliveryMethodId: number;
  shipToAddress: Address;
}

export interface IOrder {
  id: number;
  orderItems: IOrderItem[];
  buyerEmail: string;
  orderDate: Date;
  shipToAddress: Address;
  deliveryMethod: string;
  shippingPrice: number;
  subtotal: number;
  total: number;
  status: string;
}

export interface IOrderItem {
  productItemId: number;
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}
