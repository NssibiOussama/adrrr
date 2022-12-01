import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanierComponent } from './panier/panier.component';
import { AddProductComponent } from './produitsLayout/add-product/add-product.component';
import { ProduitsComponent } from './produitsLayout/produits/produits.component';
import { UpdateProductComponent } from './produitsLayout/update-product/update-product.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path:'test',component:TestComponent},
  { path: 'produits', component: ProduitsComponent },
  { path: 'produits/ajouter', component: AddProductComponent },
  { path: 'produits/supprimer/:id', component: AddProductComponent },
  { path: 'produits/modifier/:id', component: UpdateProductComponent },
  { path: 'panier', component: PanierComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
