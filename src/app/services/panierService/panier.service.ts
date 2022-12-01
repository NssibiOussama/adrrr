import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  


  token = this.authService.token;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };
  constructor(private http: HttpClient, private authService: AuthService) { }

   getAllProducts(id:number): Observable<any> {
    return this.http.get('http://localhost:3000/panier/'+id, this.httpOptions);
  }
  //delete product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete('http://localhost:3000/panier/delete/' + id, this.httpOptions);
  }
  //get single product using its ID
  getProduct(id: number): Observable<any> {
    return this.http.get('http://localhost:3000/panier/' + id,this.httpOptions);
  }

  //update product with product in the request body and its ID in request params
  update(p: any, userId: number) {
  //p contains panierId, quantity, productId, userId ;
    return this.http.put("http://localhost:3000/panier/update", {...p, user_id: userId}, this.httpOptions)
  }

  //add new product 
  addProduct(p: number, userId: number) {
    //p contains panierId, quantity, productId, userId ;
    return this.http.post("http://localhost:3000/panier",{productId: p, userId: userId},this.httpOptions);
  }

  searchProducts(search:string): Observable<any>{
    return this.http.get("http://localhost:3000/rechercheproduits?search="+search,this.httpOptions);
  }

  deleteProductFromCart(productId:number,userId: number){
    return this.http.delete('http://localhost:3000/panier/delete/'+productId+"/"+userId, this.httpOptions);
  }

  //delete all products from cart
  deleteCart(id:number){
    return this.http.delete('http://localhost:3000/panier/deletecart/'+id, this.httpOptions);
  }



}
