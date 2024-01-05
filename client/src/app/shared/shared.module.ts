import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagerComponent } from './pager/pager.component';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { ClientNavComponent } from './client-nav/client-nav.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [PagerComponent, PagingHeaderComponent, ClientNavComponent],
  imports: [CommonModule, PaginationModule.forRoot(), RouterModule],
  exports: [
    FontAwesomeModule,
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    ClientNavComponent,
  ],
})
export class SharedModule {}
