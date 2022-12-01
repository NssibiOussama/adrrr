import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { apiService } from './api.service';
import { JwtServiceService } from './jwt-service.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: User;
   private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
   isLoggedIn$ = this._isLoggedIn$.asObservable();

   get token():any {
    return localStorage.getItem("SECRET_KEY");
   }
  constructor(private apiService: apiService, private router: Router, private jwtDecote : JwtServiceService) {
     this._isLoggedIn$.next(!!this.token);
     if (!!this.token) this.user = this.getUser(this.token);
  }

  login(email: string, password: string) {

    return this.apiService.login(email, password).pipe(tap((response) => {
      this._isLoggedIn$.next(true);
      localStorage.setItem('SECRET_KEY', response.token)
      this.user = this.getUser(response.token);

    }));

  }

  signup(firstname:string, lastname:string,email: string, password: string) {

    return this.apiService.signup(firstname,lastname, email, password);

  }
  logout(){
    localStorage.removeItem("SECRET_KEY");
    this._isLoggedIn$.next(false);
    this.router.navigate(['/']);
  }

  private getUser(token: string): any {   

   // return JSON.parse(window.atob(token?.split('.')[1])) as User;
    return this.jwtDecote.DecodeToken(token)

  }
}
