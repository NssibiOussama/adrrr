import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompetitorsTeams } from 'src/app/models/CompetitorTeam.model';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompetitorsTeamsService {
  token = this.authService.token;
  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };
  competitorsTeamsUrl : string = 'http://localhost:3000/api/competitorsTeams'

  constructor(private http : HttpClient, private authService : AuthService) { }

  getCompetitorsTeams():Observable<CompetitorsTeams[]>{
    return this.http.get<CompetitorsTeams[]>(this.competitorsTeamsUrl,this.httpOptions)

  }
  addCompetitorTeam(cat: CompetitorsTeams): Observable<CompetitorsTeams> {
    return this.http.post<CompetitorsTeams>(this.competitorsTeamsUrl, cat,this.httpOptions);
  }
  deleteCompetitorTeam(id: any): Observable<any> {
    return this.http.delete<CompetitorsTeams>(this.competitorsTeamsUrl + '/' + id,this.httpOptions);
  }

  getCompetitorTeamById(id: any): Observable<CompetitorsTeams> {
    return this.http.get<CompetitorsTeams>(this.competitorsTeamsUrl + '/' + id,this.httpOptions);
  }
  updateCompetitorTeam(id: number, cat: CompetitorsTeams): Observable<CompetitorsTeams> {
    return this.http.put<CompetitorsTeams>(this.competitorsTeamsUrl + '/' + id, cat, this.httpOptions);
  }
}
