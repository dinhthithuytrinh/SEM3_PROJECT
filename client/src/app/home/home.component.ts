import { Component } from '@angular/core';
import { ShopService } from '../shop/shop.service';
import { IProduct } from '../models/IProduct';
import { IType } from '../models/IType';
import { IOrigin } from '../models/IOrigin';
import { IPagination } from '../models/IPagination';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  products: IProduct[] = [];
  products2: IProduct[] = [];
  types: IType[] = [];
  origins: IOrigin[] = [];

  typeIdSelected: number = 0;
  brandIdSelected: number = 0;
  sortSelected = 'name';
  pageNumber = 1;
  pageSize = 10;
  totalCount = 0;
  sortOption = 'priceAsc';
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  constructor(
    private shopService: ShopService,
    private basketService: BasketService
  ) {}
  faTags = faTags;
  product: IProduct | undefined;

  ngOnInit(): void {
    this.getProducts();
    this.getProducts2();
    this.getOrigins();
    this.getTypes();
  }

  addItemToBasket() {
    if (this.product) {
      this.basketService.addItemToBasket(this.product);
    }
  }

  slides = [
    { img: '/assets/img/mv1.jpg' },
    { img: '/assets/img/mv2.jpg' },
    { img: '/assets/img/mv3.jpg' },
    { img: '/assets/img/mv4.jpg' },
    { img: '/assets/img/mv5.jpg' },
  ];
  slideConfig = {
    speed: 300,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  slideConfig2 = {
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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

  getProducts2(): void {
    this.shopService
      .getProducts(
        this.sortOption,
        this.pageNumber,
        this.pageSize,
        this.brandIdSelected,
        this.typeIdSelected
      )
      .subscribe({
        next: (response: IPagination | null) => {
          this.products2 = response!.data;
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
            description: 'Made in your country - hàng nội địa',
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
