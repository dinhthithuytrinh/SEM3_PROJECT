import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then((mod) => mod.HomeModule),
    title: 'Arts - Home',
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./shop/shop.module').then((mod) => mod.ShopModule),
    title: 'Arts - Products',
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
    title: 'Arts - Admin',
  },
  {
    path: 'test-error',
    loadChildren: () =>
      import('./error/error.module').then((mod) => mod.ErrorModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
