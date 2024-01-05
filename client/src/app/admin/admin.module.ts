import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ManagementComponent } from './management/management.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from '../shop/home/home.component';

@NgModule({
  declarations: [
    AdminComponent,
    NavBarComponent,
    FooterComponent,
    HeaderComponent,
    ManagementComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [AdminComponent, ManagementComponent],
})
export class AdminModule {}
