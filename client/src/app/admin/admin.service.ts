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
  baseUrl = 'http://localhost:5000/api/';

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


  // CRUD cho Origins
  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}products/${id}`);
  }

  saveProduct(product: IProduct): Observable<IProduct> {
    // Depending on whether it's an edit or add operation, you can adjust the URL accordingly
    return this.http.post<IProduct>(`${this.baseUrl}products`, product);
  }

  addProduct(product: IProduct): Observable<IProduct> {
    // Gửi HTTP POST request để thêm mới sản phẩm
    return this.http.post<IProduct>(`${this.baseUrl}products`, product);
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    // Gửi HTTP PUT request để cập nhật sản phẩm
    return this.http.put<IProduct>(`${this.baseUrl}products/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}products/${id}`);
  }


  // CRUD cho Origins
  getOrigins(): Observable<IOrigin[]> {
    return this.http.get<IOrigin[]>(`${this.baseUrl}products/origins`);
  }

  addOrigin(origin: IOrigin): Observable<IOrigin> {
    return this.http.post<IOrigin>(`${this.baseUrl}products/origins`, origin);
  }

  updateOrigin(origin: IOrigin): Observable<IOrigin> {
    return this.http.put<IOrigin>(`${this.baseUrl}products/origins/${origin.id}`, origin);
  }

  deleteOrigin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/products/origins/${id}`);
  }

  // CRUD cho Types
  getTypes(): Observable<IType[]> {
    return this.http.get<IType[]>(`${this.baseUrl}products/types`);
  }

  addType(type: IType): Observable<IType> {
    return this.http.post<IType>(`${this.baseUrl}products/types`, type);
  }

  updateType(type: IType): Observable<IType> {
    return this.http.put<IType>(`${this.baseUrl}products/types/${type.id}`, type);
  }

  deleteType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}products/types/${id}`);
  }

}