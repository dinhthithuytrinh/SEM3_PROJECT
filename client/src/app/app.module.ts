import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { ShopModule } from './shop/shop.module';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { NavClientComponent } from './nav-client/nav-client.component';
import { FooterClientComponent } from './footer-client/footer-client.component';

@NgModule({
  declarations: [AppComponent, NavClientComponent, FooterClientComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    // ShopModule,
    // AdminModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
