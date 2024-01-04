import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IOrigin } from 'src/app/models/IOrigin';
import { IType } from 'src/app/models/IType';
import { ShopService } from '../shop.service';
import { IPagination } from 'src/app/models/IPagination';
import { IProduct } from 'src/app/models/IProduct';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];
  types: IType[] = [];
  origins: IOrigin[] = [];

  typeIdSelected: number = 0;
  brandIdSelected: number = 0;
  sortSelected = 'name';
  pageNumber = 1;
  pageSize = 9;
  totalCount = 0;

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {}
  ngOnInit(): void {
    this.getProducts();
    this.getOrigins();
    this.getTypes();
  }

  // callApi() {
  //   this.http
  //     .get('http://localhost:5000/api/products')
  //     .subscribe((response) => {
  //       console.log(response);
  //     });
  // }
  getProducts(): void {
    this.shopService
      .getProducts(
        this.sortSelected,
        this.pageNumber,
        this.pageSize,
        this.brandIdSelected,
        this.typeIdSelected
      )
      .subscribe({
        next: (response: IPagination | null) => {
          this.products = response!.data;
          this.pageNumber = response!.pageNumber;
          this.pageSize = response!.pageSize;
          this.totalCount = response!.totalCount;
        },
        error: (err) => console.log(err),
      });
  }

  getOrigins(): void {
    this.shopService.getOrigins().subscribe({
      next: (response) =>
        (this.origins = [
          {
            id: 0,
            name: 'All',
            description: 'Made in your country',
            pictureUrl: '/assets/img/allorigin.jpg',
            status: true,
          },
          ...response,
        ]),
      error: (err) => console.log(err),
    });
  }

  getTypes(): void {
    this.shopService.getTypes().subscribe({
      next: (response) =>
        (this.types = [
          {
            id: 0,
            name: 'All',
            description: 'All products of us',
            pictureUrl: '/assets/img/all.jpg',
            status: true,
          },
          ...response,
        ]),
      error: (err) => console.log(err),
    });
  }

  onSelectProductType(typeId: number) {
    this.typeIdSelected = typeId;
    this.getProducts();
  }
}
