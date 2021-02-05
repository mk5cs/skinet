import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ShopComponent } from './shop.component';


@NgModule({
  declarations: [ShopComponent, ProductItemComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  schemas: [
  CUSTOM_ELEMENTS_SCHEMA
],
  exports: [ShopComponent]
})
export class ShopModule { }
