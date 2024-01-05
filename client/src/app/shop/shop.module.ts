import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './product/product.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { RouterModule, Routes } from '@angular/router';
import { ShopRoute } from './shop.routing';
export const route: Routes = [{ path: '', component: ShopComponent }];

@NgModule({
  declarations: [ShopComponent, ProductComponent, ProductItemComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(ShopRoute)],
  exports: [ShopComponent],
})
export class ShopModule {}
