import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  types: any[] = [];
  origins: any[] = [];
  constructor(private http: HttpClient) {}

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
    this.http
      .get('http://localhost:5000/api/products/types')
      .subscribe((response: any) => {
        this.types = response;
      });
    this.http
      .get('http://localhost:5000/api/products/origins')
      .subscribe((response: any) => {
        this.origins = response;
        console.log(response);
      });
  }
}
