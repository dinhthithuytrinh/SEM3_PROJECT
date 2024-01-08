import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { faTags } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  faTags = faTags;
  @Input() product: IProduct | undefined;
}
