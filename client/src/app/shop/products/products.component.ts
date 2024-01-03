import { Component, OnInit } from '@angular/core';
import { IPagination } from 'src/app/models/IPagination';
import { ShopService } from '../shop.service';
import { IProduct } from 'src/app/models/IProduct';
import { faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IType } from 'src/app/models/IType';
import { IOrigin } from 'src/app/models/IOrigin';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  faRefresh = faRefresh;
  faSearch = faSearch;
  products: IProduct[] = [];
  pagination: any = null;
  types: IType[] = [];
  origins: IOrigin[] = [];
  pageNum: number = 0;

  typeIdSelected: number = 0;

  constructor(private shopService: ShopService) {}
  ngOnInit(): void {
    this.getPages();
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }
  // callApi() {
  //   this.shopService.getProducts().subscribe({
  //     next: (response: IPagination) => {
  //       console.log(response);
  //       this.products = response.data;
  //     },
  //     error: (err) => console.log(err),
  //   });

  //   this.shopService.getProducts().subscribe({
  //     next: (response: IPagination) => {
  //       console.log(response);
  //       this.pagination = response;
  //     },
  //     error: (err) => console.log(err),
  //   });

  //   this.shopService.getProducts().subscribe({
  //     next: (response: IPagination) => {
  //       console.log(response);
  //       this.page = Math.floor(response.totalCount / response.pageSize);
  //       console.log(
  //         (response.totalCount - (response.totalCount % response.pageSize)) /
  //           response.pageSize +
  //           1
  //       );
  //     },
  //     error: (err) => console.log(err),
  //   });

  //   this.shopService.getTypes().subscribe({
  //     next: (response: IType[]) => {
  //       console.log(response);
  //       this.types = response;
  //     },
  //     error: (err) => console.log(err),
  //   });

  //   this.shopService.getOrigins().subscribe({
  //     next: (response: IOrigin[]) => {
  //       console.log(response);
  //       this.origins = response;
  //     },
  //     error: (err) => console.log(err),
  //   });
  // }
  getPages(): void {
    this.shopService.getPages().subscribe({
      next: (response: IPagination) => {
        console.log(
          (response.totalCount - (response.totalCount % response.pageSize)) /
            response.pageSize +
            1
        );
        this.pagination = response;
        this.pageNum =
          (response.totalCount - (response.totalCount % response.pageSize)) /
            response.pageSize +
          1;
      },
      error: (err) => console.log(err),
    });
  }
  getProducts(): void {
    this.shopService.getProducts(this.typeIdSelected).subscribe({
      next: (response: IPagination | null) => {
        this.products = response!.data;
      },
      error: (err) => console.log(err),
    });
  }

  getBrands(): void {
    this.shopService.getOrigins().subscribe({
      next: (response) => (this.origins = response),
      error: (err) => console.log(err),
    });
  }

  getTypes(): void {
    this.shopService.getTypes().subscribe({
      next: (response) => (this.types = response),
      error: (err) => console.log(err),
    });
  }

  onSelectProductType(typeId: number) {
    this.typeIdSelected = typeId;
    this.getProducts();
  }
}
