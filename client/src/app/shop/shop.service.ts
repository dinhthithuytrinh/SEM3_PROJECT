import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../models/IPagination';
import { Observable } from 'rxjs';
import { IType } from '../models/IType';
import { IOrigin } from '../models/IOrigin';

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
    brandId?: number,
    typeId?: number
  ): Observable<IPagination | null> {
    let params = new HttpParams();

    if (typeId) {
      params = params.append('typeId', typeId.toString());
    }

    if (brandId) {
      params = params.append('brandId', brandId.toString());
    }

    // return this.http.get<IPagination>(
    //   this.baseUrl + 'products?pageSize=9&client=1',
    //   {
    //     params,
    //   }
    // );

    params = params.append('sort', sort);
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'products?client=1', {
      params,
    });
  }

  getTypes(): Observable<IType[]> {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }

  getOrigins(): Observable<IOrigin[]> {
    return this.http.get<IOrigin[]>(this.baseUrl + 'products/origins');
  }
}
