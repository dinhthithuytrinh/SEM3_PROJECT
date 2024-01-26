import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoute } from './admin.routing';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOriginsComponent } from './admin-origins/admin-origins.component';
import { AdminTypesComponent } from './admin-types/admin-types.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditOriginsComponent } from './admin-origins/add-edit-origins/add-edit-origins.component';
import { AddEditTypesComponent } from './admin-types/add-edit-types/add-edit-types.component';
import { AddEditProductsComponent } from './admin-products/add-edit-products/add-edit-products.component';
// export const route: Routes = [{ path: '', component: AdminComponent }];
@NgModule({
  declarations: [
    AdminComponent,
    AdminProductsComponent,
    AdminOriginsComponent,
    AdminTypesComponent,
    AddEditOriginsComponent,
    AddEditTypesComponent,
    AddEditProductsComponent
  ],
  imports: [CommonModule,ReactiveFormsModule, SharedModule,FormsModule, RouterModule.forChild(AdminRoute)],
  exports: [AdminComponent],
})
export class AdminModule {}
