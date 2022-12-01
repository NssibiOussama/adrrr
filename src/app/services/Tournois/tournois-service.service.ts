import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Tournois } from 'src/app/models/Tournois.model';

@Injectable({
  providedIn: 'root'
})
export class TournoisServiceService {
  token = this.authService.token;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };
  TournoisUrl : string = 'http://localhost:3000/api/tournois'

  constructor(private http : HttpClient, private authService : AuthService) { }


  getTournois():Observable<Tournois[]>{
    return this.http.get<Tournois[]>(this.TournoisUrl,this.httpOptions)

  }
  addTournois(tor: Tournois): Observable<Tournois> {
    return this.http.post<Tournois>(this.TournoisUrl, tor,this.httpOptions);
  }
  deleteTournois(id: any): Observable<any> {
    return this.http.delete<Tournois>(this.TournoisUrl + '/' + id,this.httpOptions);
  }

  getTournoisById(id: any): Observable<Tournois> {
    return this.http.get<Tournois>(this.TournoisUrl + '/' + id,this.httpOptions);
  }
  updateTournois(id: number, tor: Tournois): Observable<Tournois> {
    return this.http.put<Tournois>(this.TournoisUrl + '/' + id, tor, this.httpOptions);
  }
}
