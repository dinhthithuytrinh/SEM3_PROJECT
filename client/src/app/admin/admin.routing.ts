import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';

export const AdminRoute: Routes = [
  { path: '', component: AdminComponent },
  { path: 'management/products', component: AdminProductsComponent },
  { path: 'management/origins', component: AdminProductsComponent },
  { path: 'management/types', component: AdminProductsComponent },
];
