import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { BasketService } from 'src/app/basket/basket.service';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  faTags = faTags;
  @Input() product: IProduct | undefined;

  constructor(private basketService: BasketService) {
  }

  addItemToBasket() {
    if (this.product) {
      this.basketService.addItemToBasket(this.product);
    }
  }
}
