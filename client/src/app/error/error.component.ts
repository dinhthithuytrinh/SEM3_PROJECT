import { Component } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  baseUrl = environment.apiUrl;
  validationError: any;
  constructor(private http: HttpClient) {}

  get404Error() {
    this.http.get(this.baseUrl + 'buggy/endpointdoesnotexist').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  get400ValidationError() {
    this.http.get(this.baseUrl + 'buggy/badrequest/onehundred').subscribe({
      next: (res) => console.log(res),
      error: (err) => {
        console.log(err);
        this.validationError = err.errors;
      },
    });
  }
}
