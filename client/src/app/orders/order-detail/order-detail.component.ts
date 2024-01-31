import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../orders.service';
import { IOrder } from '../../models/order';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent {
  order: IOrder | undefined;

  constructor(
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private ordersService: OrdersService
  ) {
    this.breadcrumbService.set('orderDetailed', '');
  }

  ngOnInit(): void {
    this.ordersService
      .getOrderDetailed(+this.route.snapshot.paramMap.get('id')!)
      .subscribe(
        (result: IOrder) => {
          this.order = result;
          this.breadcrumbService.set(
            'orderDetailed',
            `Order# ${result.id} - ${result.status}`
          );
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
