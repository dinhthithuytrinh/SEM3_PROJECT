import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IOrigin } from 'src/app/models/IOrigin';
import { IType } from 'src/app/models/IType';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit  {
  types: IType[] = [];
  origins: IOrigin[] = [];
  constructor(private shopService: ShopService) {}
  ngOnInit(): void {
    this.callApi();
  }

  // callApi() {
  //   this.http
  //     .get('http://localhost:5000/api/products')
  //     .subscribe((response) => {
  //       console.log(response);
  //     });
  // }
  callApi() {
    // this.http
    //   .get<IType[]>('http://localhost:5000/api/products/types')
    //   .subscribe(
    //     (response: IType[]) => {
    //       this.types = response;
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // this.http
    //   .get<IOrigin[]>('http://localhost:5000/api/products/origins')
    //   .subscribe(
    //     (response: IOrigin[]) => {
    //       this.origins = response;
    //       console.log(response);
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // callApi() {
    this.shopService.getTypes().subscribe({
      next: (response: IType[]) => {
        console.log(response);
        this.types = response;
      },
      error: (err) => console.log(err),
    });

    this.shopService.getOrigins().subscribe({
      next: (response: IOrigin[]) => {
        console.log(response);
        this.origins = response;
      },
      error: (err) => console.log(err),
    });
  }
}
