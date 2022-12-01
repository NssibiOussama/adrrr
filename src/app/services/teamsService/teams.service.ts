import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipe } from 'src/app/models/equipe.model';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  token = this.authService.token;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };
  TeamsUrl: string = 'http://localhost:3000/api/teams'
  constructor(private http: HttpClient, private authService: AuthService) { }


  getTeams(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(this.TeamsUrl, this.httpOptions)

  }
  addTeam(team: Equipe): Observable<Equipe> {
    return this.http.post<Equipe>(this.TeamsUrl, team, this.httpOptions);
  }
  deleteTeam(id: any): Observable<any> {
    return this.http.delete<Equipe>(this.TeamsUrl + '/' + id, this.httpOptions);
  }

  getTeamsById(id: any): Observable<Equipe> {
    return this.http.get<Equipe>(this.TeamsUrl + '/' + id, this.httpOptions);
  }
  updateTeam(id: number, team: Equipe): Observable<Equipe> {
    return this.http.put<Equipe>(this.TeamsUrl + '/' + id, team, this.httpOptions);
  }
}