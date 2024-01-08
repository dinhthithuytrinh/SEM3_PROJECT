import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from 'src/app/models/IProduct';
import { IPagination } from 'src/app/models/IPagination';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  faMinusCircle = faMinusCircle;
  faPlusCircle = faPlusCircle;

  product: IProduct | undefined;
  products: IProduct[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private shopService: ShopService
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

  getProducts(): void {
    this.shopService.getRelateProducts().subscribe({
      next: (response: IPagination | null) => {
        this.products = response!.data;
        console.log('henxui: ' + response!.data);
      },
      error: (err) => console.log(err),
    });
  }
}
