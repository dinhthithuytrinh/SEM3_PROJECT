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
@NgModule({
  declarations: [
    PagerComponent,
    PagingHeaderComponent,
    ClientNavComponent,
    ClientFooterComponent,
    AdminNavbarComponent,
    AdminHeaderComponent,
  ],
  imports: [CommonModule, PaginationModule.forRoot(), RouterModule],
  exports: [
    FontAwesomeModule,
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    ClientNavComponent,
    ClientFooterComponent,
    AdminNavbarComponent,
    AdminHeaderComponent,
  ],
})
export class SharedModule {}
