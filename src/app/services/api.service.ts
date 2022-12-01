import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class apiService {
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }


  login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/api/login', { email, password }, this.httpOptions);
  }

  signup(firstname:string,lastname:string,email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/api/signup', { firstname,lastname,email, password }, this.httpOptions);
  }
}
