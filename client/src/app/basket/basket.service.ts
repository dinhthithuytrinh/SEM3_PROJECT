import { Injectable } from '@angular/core';
import { Basket, IBasket, IBasketItem, IBasketTotal } from '../models/Basket';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../models/IProduct';
import { environment } from '../environment/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  basket: IBasket = ({id: '', items: []});
  basketTotal: IBasketTotal = ({shipping: 0, subtotal: 0, total: 0});
  constructor(private http: HttpClient) { }

  addItemToBasket(item: IProduct, quantity = 1) {
    let itemToAdd: IBasketItem = {
      id: item.id,
      productCode: item.productCode,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity: quantity,
      brand: item.productBrand,
      type: item.productType
    };

    this.basket = (this.basket.id === '')
                          ? this.createNewBasket()
                          : this.basket;

    var index = this.basket.items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1) {
      this.basket.items.push(itemToAdd);
    } else {
      this.basket.items[index].quantity += quantity;
    }

    this.setBasket(this.basket);
  }


  setBasket(basket: IBasket) {
    return this.http.post<IBasket>(this.baseUrl + 'basket', basket).subscribe({
      next: (response) => {
        console.log(response);
        this.basket = response; 
        this.calculateTotals();
      },
      error: (err) => console.log(err)
    });
  }

  getBasket(id: string) {
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id)
      .pipe(
        map((result: IBasket) => {
          this.basket = result; 
          console.log(result);
          this.calculateTotals();})
      );
  }

  incrementItemQuantity(item: IBasketItem) {
    let bk = {...this.basket};
    let index = bk.items.findIndex(x => x.id === item.id);
    bk.items[index].quantity++;
    this.setBasket(bk);
  }

  decrementItemQuantity(item: IBasketItem) {
    let bk = {...this.basket};
    let index = bk.items.findIndex(x => x.id === item.id);
    if (bk.items[index].quantity > 1) {
      bk.items[index].quantity--;
      this.setBasket(bk);
    } else {
      this.removeItemFromBasket(item);
    }
  }

  removeItemFromBasket(item: IBasketItem) {
    let bk = {...this.basket};
    if (bk.items.some(x => x.id === item.id)) {
      bk.items = bk.items.filter(i => i.id !== item.id);
      if (bk.items.length > 0) {
        this.setBasket(bk);
      } else {
        this.deleteBasket(bk);
      }
    }
  }

  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe({
      next: () => {
        this.basket = ({id: '', items: []});
        this.basketTotal = ({shipping: 0, subtotal: 0, total: 0});
        localStorage.removeItem('basket_id');
      },
      error: (err) => console.log(err)
    });
  }

  private createNewBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  
  private calculateTotals() {
    let basket = this.basket;
    let shipping = 0;
    let subtotal = basket.items.reduce((sum, item) => (item.price * item.quantity) + sum, 0);
    let total = subtotal + shipping;
    this.basketTotal = ({shipping, subtotal, total});
  }
}
