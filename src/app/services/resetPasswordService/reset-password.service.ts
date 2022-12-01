import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  token = this.authService.token;
  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  resetUrl : string = 'http://localhost:3000/api/mdp'
  

  constructor(private http : HttpClient, private authService : AuthService) { }
  resetCode(email: string): Observable<any> {
    return this.http.post(this.resetUrl, email);
  }

}
