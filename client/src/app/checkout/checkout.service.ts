import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IDeliveryMethod } from '../models/deliveryMethod';
import { IOrderToCreate, IOrder } from '../models/order';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDeliveryMethods(): Observable<IDeliveryMethod[]> {
    return this.http
      .get<IDeliveryMethod[]>(this.baseUrl + 'orders/deliveryMethods')
      .pipe(
        map((deliveryMethods: IDeliveryMethod[]) => {
          return deliveryMethods.sort((a, b) => b.price - a.price);
        })
      );
  }

  createOrder(order: IOrderToCreate) {
    return this.http.post<IOrder>(this.baseUrl + 'orders', order);
  }
}
