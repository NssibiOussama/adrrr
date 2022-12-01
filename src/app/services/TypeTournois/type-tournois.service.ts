import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TournoisType } from 'src/app/models/TournoisType.model';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeTournoisService {

  token = this.authService.token;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };
  TournoisTypeUrl : string = 'http://localhost:3000/api/tournoisType'
  constructor(private http : HttpClient, private authService : AuthService) { }



  getTypeTournois():Observable<TournoisType[]>{
    return this.http.get<TournoisType[]>(this.TournoisTypeUrl,this.httpOptions)

  }



}
