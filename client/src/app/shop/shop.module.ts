import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [ShopComponent, HomeComponent, ProductsComponent],
  imports: [CommonModule],
  exports: [ShopComponent, HomeComponent],
})
export class ShopModule {}
