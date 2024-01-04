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
  pageNum: number = 1;

  typeIdSelected: number = 0;
  originIdSelected: number = 0;
  sortSelected = 'name';
  pageNumber = 1;
  pageSize = 9;
  totalCount = 0;
  private clickCounter = 0;
  private clickCouter2 = 0;
  sortOptions = [
    { name: 'Alphabetical', value: 'nameAsc' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
    { name: 'Date: Older', value: 'updateDate' },
  ];

  constructor(private shopService: ShopService) {}
  ngOnInit(): void {
    this.getProducts();
    this.getOrigins();
    this.getTypes();
  }

  getProducts(): void {
    this.shopService
      .getProducts(
        this.sortSelected,
        this.pageNumber,
        this.pageSize,
        this.originIdSelected,
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
            name: 'All origin',
            description: '/assets/img/allorigin.jpg',
            pictureUrl: '',
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
            name: 'All type',
            description: '',
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
    // this.clickCouter2++;
    // if (this.clickCouter2 > 0 && this.clickCouter2 % 2 === 0) {
    //   this.typeIdSelected = 0;
    // }
    this.getProducts();
  }

  onOriginSelect(originId: number) {
    // console.log('xuaat xu: ' + originId);
    // console.log('xuaat: ' + this.originIdSelected);
    this.originIdSelected = originId;
    // this.clickCounter++;
    // console.log(this.clickCounter);
    // if (this.clickCounter % 2 === 0) {
    //   console.log('xuaat xu: ' + originId);
    //   console.log('xuaat: ' + this.originIdSelected);
    //   if (originId != this.originIdSelected) {
    //     this.originIdSelected = 0;
    //   } else {
    //     this.originIdSelected = originId;
    //   }
    // }
    this.getProducts();
  }

  onSortSelect(event: Event) {
    // console.log(event);
    this.sortSelected = (<HTMLSelectElement>event.target).value;
    this.getProducts();
  }

  onPageChanged(event: any) {
    this.pageNumber = event.page;
    this.getProducts();
  }
}
