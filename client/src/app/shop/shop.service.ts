import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../models/IPagination';
import { Observable } from 'rxjs';
import { IType } from '../models/IType';
import { IOrigin } from '../models/IOrigin';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  getPages(): Observable<IPagination> {
    return this.http.get<IPagination>(this.baseUrl + 'products?pageSize=9');
  }

  getProducts(
    sort: string,
    pageNumber: number,
    pageSize: number,
    originId?: number,
    typeId?: number,
    search?: string
  ): Observable<IPagination | null> {
    let params = new HttpParams();

    if (typeId) {
      params = params.append('typeId', typeId.toString());
    }

    if (originId) {
      console.log('aaaa');
      params = params.append('brandId', originId.toString());
    }

    // return this.http.get<IPagination>(
    //   this.baseUrl + 'products?pageSize=9&client=1',
    //   {
    //     params,
    //   }
    // );
    if (search) {
      params = params.append('search', search);
    }

    params = params.append('sort', sort);
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    console.log(this.baseUrl + 'products?client=1' + params);
    return this.http.get<IPagination>(this.baseUrl + 'products?client=1', {
      params,
    });
  }

  getReProducts(): Observable<IPagination | null> {
    return this.http.get<IPagination>(this.baseUrl + 'products?client=1&pageSize=3');
  }

  getRelateProducts(): Observable<IPagination> {
    // console.log('aa', this.http.get<IPagination>(
    //   this.baseUrl + 'products?pageSize=3&client=1'
    // ));
    return this.http.get<IPagination>(
      this.baseUrl + 'products?pageSize=3&client=1'
    );
  }

  getTypes(): Observable<IType[]> {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }

  getOrigins(): Observable<IOrigin[]> {
    return this.http.get<IOrigin[]>(this.baseUrl + 'products/origins');
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }
}
