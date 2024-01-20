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


  // CRUD cho Products

  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}products/${id}`);
  }

  saveProduct(product: IProduct): Observable<IProduct> {
    // Depending on whether it's an edit or add operation, you can adjust the URL accordingly
    return this.http.post<IProduct>(`${this.baseUrl}products`, product);
  }

  addProduct(product: IProduct): Observable<IProduct> {
    // Gửi HTTP POST request để thêm mới sản phẩm

    return this.http.post<IProduct>(`${this.baseUrl}products/Create`, product);
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    // Gửi HTTP PUT request để cập nhật sản phẩm
    return this.http.put<IProduct>(`${this.baseUrl}products/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}products/${id}`);
  }


  // CRUD cho Origins
  // getOrigins(): Observable<IOrigin[]> {
  //   return this.http.get<IOrigin[]>(`${this.baseUrl}products/origins`);
  // }

  // addOrigin(origin: any): Observable<IOrigin> {
  //   return this.http.post<any>(`${this.baseUrl}products/origins/Create`, origin);
  // }

  // updateOrigin(origin: any): Observable<IOrigin> {
  //   return this.http.put<any>(`${this.baseUrl}products/origins/${origin.id}`, origin);
  // }

  // deleteOrigin(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/products/origins/${id}`);
  // }

  // uploadPhoto(photo: any) {
  //   return this.http.post(this.baseUrl + 'products/origins/savefile', photo);
  // }

  //CRUD cho Origins FormData
  getOrigins(): Observable<IOrigin[]> {
    return this.http.get<IOrigin[]>(`${this.baseUrl}products/origins`);
  }

  getOriginById(id: number): Observable<IOrigin> {
    return this.http.get<IOrigin>(`${this.baseUrl}products/origins/${id}`);
  }

  addOrigin(origin: any): Observable<IOrigin> {
    const formData: FormData = this.createFormDataFromObject(origin);

    return this.http.post<IOrigin>(`${this.baseUrl}products/origins/Create`, formData);
  }

  updateOrigin(origin: any): Observable<IOrigin> {
    const formData: FormData = this.createFormDataFromObject(origin);

    return this.http.put<IOrigin>(`${this.baseUrl}products/origins/${origin.id}`, formData);
  }

  deleteOrigin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}products/origins/${id}`);
  }

  uploadPhoto(photo: any): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', photo);

    return this.http.post<string>(`${this.baseUrl}products/origins/savefile`, formData);
  }

  private createFormDataFromObject(obj: any): FormData {
    const formData: FormData = new FormData();
    Object.keys(obj).forEach(key => {
      formData.append(key, obj[key]);
    });
    return formData;
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