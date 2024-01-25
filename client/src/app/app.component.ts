import { LocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isAdmin: Boolean = false;
  constructor(
    private router: Router,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit() {
    console.log(this.router.url);
    this.spinnerService.show();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 5000);
  }
}
