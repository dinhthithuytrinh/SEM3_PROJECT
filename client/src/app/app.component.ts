import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
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
        this.types = response.data;
      });
    this.http
      .get('http://localhost:5000/api/products/origins')
      .subscribe((response: any) => {
        this.origins = response.data;
      });
  }
}
