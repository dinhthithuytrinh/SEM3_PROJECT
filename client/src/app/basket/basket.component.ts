import { Component } from '@angular/core';

import { BasketService } from './basket.service';
import { faMinusCircle, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IBasketItem } from '../models/Basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  faPlusCircle = faPlusCircle; faMinusCircle = faMinusCircle; faTrash= faTrash;

  constructor(public basketService: BasketService) {}
  
  incrementItemQuantity(item: IBasketItem) {
    this.basketService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: IBasketItem) {
    this.basketService.decrementItemQuantity(item);
  }

  removeItemFromBasket(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }
}
