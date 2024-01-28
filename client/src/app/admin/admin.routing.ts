import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminTypesComponent } from './admin-types/admin-types.component';
import { AdminOriginsComponent } from './admin-origins/admin-origins.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';

export const AdminRoute: Routes = [
  { path: '', component: AdminComponent },
  { path: 'management/products', component: AdminProductsComponent },
  { path: 'management/origins', component: AdminOriginsComponent },
  { path: 'management/types', component: AdminTypesComponent },
  { path: 'management/account', component: AdminAccountComponent },
];
