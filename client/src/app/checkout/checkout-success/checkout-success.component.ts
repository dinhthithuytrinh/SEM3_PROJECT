import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { IOrder } from 'src/app/models/order';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss'],
})
export class CheckoutSuccessComponent implements OnInit {
  /// FontAwsome icons
  faCheckCircle = faCheckCircle;

  order: IOrder | undefined;

  constructor(private router: Router) {
    let navigation = this.router.getCurrentNavigation();
    let state = navigation!.extras.state;
    if (state) {
      this.order = state as IOrder;
    }
  }

  ngOnInit(): void {
    console.log(this.order);
  }
}
