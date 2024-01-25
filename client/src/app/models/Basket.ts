import { v4 as uuid } from "uuid";

export interface IBasket {
  id: string
  items: IBasketItem[]
}

export interface IBasketItem {
  id: number
  productName: string
  price: number
  quantity: number
  pictureUrl: string
  type: string
  brand: string
}

export class Basket implements IBasket {
  id: string = uuid();
  items: IBasketItem[] = [];
}