import { Component, ElementRef, ViewChild } from '@angular/core';
import { faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from '../models/IProduct';
import { IType } from '../models/IType';
import { IOrigin } from '../models/IOrigin';
import { ShopService } from './shop.service';
import { IPagination } from '../models/IPagination';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
  @ViewChild('search') searchElement: ElementRef | undefined;

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
  search = '';

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
        this.typeIdSelected,
        this.search
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

  onPageChanged(eventEmittedNumber: number) {
    this.pageNumber = eventEmittedNumber;
    this.getProducts();
  }

  onSearch() {
    this.search = this.searchElement?.nativeElement.value;
    this.getProducts();
  }

  onReset() {
    this.searchElement!.nativeElement.value = '';
    this.typeIdSelected = 0;
    this.originIdSelected = 0;
    this.sortSelected = 'name';
    this.pageNumber = 1;
    this.pageSize = 3;
    this.totalCount = 0;
    this.search = '';
    this.getProducts();
  }
}
