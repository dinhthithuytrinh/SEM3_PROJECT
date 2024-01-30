import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagerComponent } from './pager/pager.component';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { ClientNavComponent } from './client-nav/client-nav.component';
import { RouterModule } from '@angular/router';
import { ClientFooterComponent } from './client-footer/client-footer.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminRoute } from '../admin/admin.routing';
import { ToastrModule } from 'ngx-toastr';
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input/text-input.component';
import { StepperComponent } from './stepper/stepper.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { BasketSummaryComponent } from './basket-summary/basket-summary.component';
@NgModule({
  declarations: [
    PagerComponent,
    PagingHeaderComponent,
    ClientNavComponent,
    ClientFooterComponent,
    AdminNavbarComponent,
    AdminHeaderComponent,
    OrderTotalsComponent,
    TextInputComponent,
    StepperComponent,
    BasketSummaryComponent,
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    RouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      tapToDismiss: true,
      preventDuplicates: true,
    }),
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    FontAwesomeModule,
  ],
  exports: [
    FontAwesomeModule,
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    ClientNavComponent,
    ClientFooterComponent,
    AdminNavbarComponent,
    AdminHeaderComponent,
    OrderTotalsComponent,
    ReactiveFormsModule,
    TextInputComponent,
    StepperComponent,
    BsDropdownModule,
    CdkStepperModule,
    BasketSummaryComponent,
  ],
})
export class SharedModule {}
