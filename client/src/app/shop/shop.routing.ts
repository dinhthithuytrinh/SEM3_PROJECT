import { Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { HomeComponent } from '../home/home.component';
import { ProductComponent } from './product/product.component';

export const ShopRoute: Routes = [
  // { path: '', component: HomeComponent },
  { path: '', component: ShopComponent },
  { path: 'product/:id', component: ProductComponent, pathMatch: 'full' },
];
