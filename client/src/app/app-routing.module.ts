import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';

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
    path: 'basket',
    loadChildren: () =>
      import('./basket/basket.module').then((mod) => mod.BasketModule),
    title: 'Arts - Basket',
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./checkout/checkout.module').then((mod) => mod.CheckoutModule),
    title: 'Arts - Checkout',
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
    title: 'Arts - Admin',
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   title: 'Arts - Login',
  // },
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  //   title: 'Arts - Register',
  // },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
    title: 'Arts - Login',
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
