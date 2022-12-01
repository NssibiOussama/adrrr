import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  token = this.authService.token;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };
  constructor(private http: HttpClient, private authService: AuthService) { }
  // Get all products : for admin 
  getAllProductsAdmin(): Observable<any> {
    return this.http.get('http://localhost:3000/admin/produits', this.httpOptions);
  }
  //Get all products that are different from user's product 
  getAllProducts():Observable<any>{
    return this.http.get('http://localhost:3000/produits/'+this.authService.user.userId, this.httpOptions);
  }


  //delete product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete('http://localhost:3000/produits/delete/' + id, this.httpOptions);
  }
  //get single product using its ID
  getProduct(id: number): Observable<any> {
    return this.http.get('http://localhost:3000/produit/' + id,this.httpOptions);
  }

  //update product with product in the request body and its ID in request params
  updateProduct(p: any, id: number) {
    return this.http.put("http://localhost:3000/produits/update/" + id, p,this.httpOptions)
  }

  //add new product 
  addProduct(p: Product) {
    return this.http.post("http://localhost:3000/produits", p,this.httpOptions);
  }
  //get connected user's products
  getMyProducts():Observable<any> {
    return this.http.get("http://localhost:3000/mesproduits/"+this.authService.user.userId,this.httpOptions);
  }

  searchProducts(search:string, id:number): Observable<any>{
    return this.http.get("http://localhost:3000/rechercheproduits?search="+search+"&id="+id,this.httpOptions);
  }




}
