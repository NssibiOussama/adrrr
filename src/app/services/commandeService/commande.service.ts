import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  
  token = this.authService.token;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };
  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllOrders(): Observable<any> {
    return this.http.get('http://localhost:3000/orders', this.httpOptions);
  }
  //delete order
  deleteOrder(id: number): Observable<any> {
    return this.http.delete('http://localhost:3000/orders/' + id, this.httpOptions);
  }
  
  //update order
  update(id: number, a:any) {
    return this.http.put("http://localhost:3000/orders/"+id,{update:a},this.httpOptions)
  }

  //add new product 
  addOrder(data:any) {
    //p contains panierId, quantity, productId, userId ;
    return this.http.post("http://localhost:3000/orders",data,this.httpOptions);
  }

 

}
