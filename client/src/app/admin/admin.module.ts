import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoute } from './admin.routing';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOriginsComponent } from './admin-origins/admin-origins.component';
import { AdminTypesComponent } from './admin-types/admin-types.component';
// export const route: Routes = [{ path: '', component: AdminComponent }];
@NgModule({
  declarations: [
    AdminComponent,
    AdminProductsComponent,
    AdminOriginsComponent,
    AdminTypesComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(AdminRoute)],
  exports: [AdminComponent],
})
export class AdminModule {}
