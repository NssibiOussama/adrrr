import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProduitsComponent } from './produitsLayout/produits/produits.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './produitsLayout/add-product/add-product.component';
import { UpdateProductComponent } from './produitsLayout/update-product/update-product.component';
import { PanierComponent } from './panier/panier.component';
import { TestComponent } from './test/test.component';


@NgModule({
  declarations: [
    ProduitsComponent,
    AddProductComponent,
    UpdateProductComponent,
    PanierComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class UserModule { }
