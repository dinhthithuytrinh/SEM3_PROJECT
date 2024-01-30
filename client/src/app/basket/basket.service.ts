import { Injectable } from '@angular/core';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../models/Basket';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../models/IProduct';
import { environment } from '../environment/environment';
import { BehaviorSubject, map } from 'rxjs';
import { IDeliveryMethod } from '../models/deliveryMethod';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;

  private basketSource = new BehaviorSubject<IBasket>({ id: '', items: [] });
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>({
    shipping: 0,
    subtotal: 0,
    total: 0,
  });
  basketTotal$ = this.basketTotalSource.asObservable();
  shipping = 0;

  constructor(private http: HttpClient) {}

  getBasket(id: string) {
    console.log('bk', id);
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      })
    );
  }

  setBasket(basket: IBasket) {
    return this.http.post<IBasket>(this.baseUrl + 'basket', basket).subscribe(
      (response: IBasket) => {
        this.basketSource.next(response);
        console.log(response);
        this.calculateTotals();
      },
      (error) => console.log(error)
    );
  }

  getCurrentBasketValue() {
    console.log('bk', this.basketSource.value);
    return this.basketSource.value;
  }

  incrementItemQuantity(item: IBasketItem) {
    let basket = this.getCurrentBasketValue();
    let index = basket.items.findIndex((x) => x.id === item.id);
    basket.items[index].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IBasketItem) {
    let basket = this.getCurrentBasketValue();
    let index = basket.items.findIndex((x) => x.id === item.id);
    if (basket.items[index].quantity > 1) {
      basket.items[index].quantity--;
      this.setBasket(basket);
    } else {
      this.removeItemFromBasket(item);
    }
  }

  removeItemFromBasket(item: IBasketItem) {
    let basket = this.getCurrentBasketValue();
    if (basket.items.some((x) => x.id === item.id)) {
      basket.items = basket.items.filter((i) => i.id !== item.id);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }

  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(
      () => {
        this.basketSource.next({ id: '', items: [] });
        this.basketTotalSource.next({ shipping: 0, subtotal: 0, total: 0 });
        localStorage.removeItem('basket_id');
      },
      (error) => console.log(error)
    );
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    var itemToAdd: IBasketItem = {
      id: item.id,
      productCode: item.productCode,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity: quantity,
      brand: item.productBrand,
      type: item.productType,
    };
    var basket: IBasket =
      !this.getCurrentBasketValue() || this.getCurrentBasketValue().id === ''
        ? this.createNewBasket()
        : this.getCurrentBasketValue();
    var index = basket.items.findIndex((i) => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      basket.items.push(itemToAdd);
    } else {
      basket.items[index].quantity += quantity;
    }

    console.log(basket);
    this.setBasket(basket);
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.shipping = deliveryMethod.price;
    this.calculateTotals();
  }

  deleteBasketWithoutCallingToAPI(id: string) {
    this.basketSource.next({ id: '', items: [] });
    this.basketTotalSource.next({ shipping: 0, subtotal: 0, total: 0 });
    localStorage.removeItem('basket_id');
  }

  private createNewBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private calculateTotals() {
    let basket = this.getCurrentBasketValue();
    let shipping = this.shipping;
    let subtotal = basket.items.reduce(
      (result, item) => item.price * item.quantity + result,
      0
    );
    let total = subtotal + shipping;
    this.basketTotalSource.next({
      shipping: shipping,
      subtotal: subtotal,
      total: total,
    });
  }

  getCurrentTotalBasketValue() {
    return this.basketTotalSource.value;
  }
}
