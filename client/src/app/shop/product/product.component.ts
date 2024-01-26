import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from 'src/app/models/IProduct';
import { IPagination } from 'src/app/models/IPagination';
import { BasketService } from 'src/app/basket/basket.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  faMinusCircle = faMinusCircle;
  faPlusCircle = faPlusCircle;
  quantity = 1;
  product: IProduct | undefined;
  products: IProduct[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private shopService: ShopService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
    this.getProducts();
  }

  loadProduct() {
    this.shopService
      .getProductById(+this.activatedRoute.snapshot.paramMap.get('id')!)
      .subscribe({
        next: (p) => (this.product = p),
        error: (err) => console.log(err),
      });
  }

  getProducts() {
    this.shopService.getReProducts().subscribe({
      next: (response: IPagination | null) => {
        this.products = response!.data;
        console.log('data2:', response!.data);
      },
      error: (err) => console.log(err),
    });
  }

  incrementQty() {
    this.quantity++;
  }

  decrementQty() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addItemToBasket() {
    if (this.product && this.quantity > 0) {
      this.basketService.addItemToBasket(this.product, this.quantity);
    }
  }
}
