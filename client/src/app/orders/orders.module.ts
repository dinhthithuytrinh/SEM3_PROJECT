import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { OrdersRoutes } from './orders.routing';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  declarations: [OrdersComponent, OrderDetailComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(OrdersRoutes)],
})
export class OrdersModule {}
