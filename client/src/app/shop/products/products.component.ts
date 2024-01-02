import { Component, OnInit } from '@angular/core';
import { IPagination } from 'src/app/models/IPagination';
import { ShopService } from '../shop.service';
import { IProduct } from 'src/app/models/IProduct';
import { faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  faRefresh = faRefresh;
  faSearch = faSearch;
  products: IProduct[] = [];
  constructor(private shopService: ShopService) {}
  ngOnInit(): void {
    this.callApi();
  }
  callApi() {
    this.shopService.getProducts().subscribe({
      next: (response: IPagination) => {
        console.log(response);
        this.products = response.data;
      },
      error: (err) => console.log(err),
    });
  }
}
