import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/IProduct';
import { IOrigin } from '../models/IOrigin';
import { IType } from '../models/IType';
import { IPagination } from '../models/IPagination';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  // getPages(): Observable<IPagination> {
  //   return this.http.get<IPagination>(this.baseUrl + 'products?pageSize=9');
  // }
  
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
      params = params.append('originId', originId.toString());
    }

    if (search) {
      params = params.append('search', search);
    }

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
