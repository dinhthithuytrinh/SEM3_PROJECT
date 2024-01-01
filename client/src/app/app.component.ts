import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.callApi();
  }

  callApi() {
    this.http
      .get('http://localhost:5000/api/products')
      .subscribe((response) => {
        console.log(response);
      });
  }
}
