import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationModule } from 'ngx-bootstrap/pagination';
@NgModule({
  declarations: [],
  imports: [CommonModule, PaginationModule.forRoot()],
  exports: [FontAwesomeModule, PaginationModule],
})
export class SharedModule {}
