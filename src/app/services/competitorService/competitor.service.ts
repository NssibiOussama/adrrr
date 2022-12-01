import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competitors } from 'src/app/models/competitor.model';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompetitorService {
  token = this.authService.token;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };
  CompetitorsUrl : string = 'http://localhost:3000/api/competitiors'
  

  constructor(private http : HttpClient, private authService : AuthService) { }

  getCompetitors():Observable<Competitors[]>{
    return this.http.get<Competitors[]>(this.CompetitorsUrl,this.httpOptions)

  }
  addCompetitor(cat: Competitors): Observable<Competitors> {
    return this.http.post<Competitors>(this.CompetitorsUrl, cat,this.httpOptions);
  }
  deleteCompetitor(id: any): Observable<any> {
    return this.http.delete<Competitors>(this.CompetitorsUrl + '/' + id,this.httpOptions);
  }

  getCompetitorById(id: any): Observable<Competitors> {
    return this.http.get<Competitors>(this.CompetitorsUrl + '/' + id,this.httpOptions);
  }
  updateCompetitor(id: number, cat: Competitors): Observable<Competitors> {
    return this.http.put<Competitors>(this.CompetitorsUrl + '/' + id, cat, this.httpOptions);
  }
}

