import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./shop/shop.module').then((mod) => mod.ShopModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
