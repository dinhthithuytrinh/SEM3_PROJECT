import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyCount = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  busy() {
    this.busyCount = this.busyCount + 1;
    this.spinnerService.show();
  }

  idle() {
    this.busyCount--;
    if (this.busyCount <= 0) {
      this.busyCount = 0;
      this.spinnerService.hide();
    }
  }
}