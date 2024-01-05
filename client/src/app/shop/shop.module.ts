import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './product/product.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    ShopComponent,
    HomeComponent,
    NavBarComponent,
    ProductsComponent,
    ProductComponent,
    ProductItemComponent,
    FooterComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [ShopComponent, HomeComponent],
})
export class ShopModule {}
