import { HttpClient } from '@angular/common/http';
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

  getProducts(): Observable<IPagination> {
    return this.http.get<IPagination>(this.baseUrl + 'products?pageSize=9');
  }

  getTypes(): Observable<IType[]> {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }

  getOrigins(): Observable<IOrigin[]> {
    return this.http.get<IOrigin[]>(this.baseUrl + 'products/origins');
  }
}
