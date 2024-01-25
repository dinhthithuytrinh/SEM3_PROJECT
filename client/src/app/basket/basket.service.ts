import { Injectable } from '@angular/core';
import { Basket, IBasket, IBasketItem } from '../models/Basket';
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

  constructor(private http: HttpClient) { }

  addItemToBasket(item: IProduct, quantity = 1) {
    let itemToAdd: IBasketItem = {
      id: item.id,
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
      },
      error: (err) => console.log(err)
    });
  }

  getBasket(id: string) {
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id)
      .pipe(
        map((result: IBasket) => {this.basket = result; console.log(result);})
      );
  }


  private createNewBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }
}
