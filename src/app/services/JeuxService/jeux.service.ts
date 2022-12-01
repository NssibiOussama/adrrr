import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jeux } from 'src/app/models/jeux.model';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class JeuxService {
  token = this.authService.token;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };
  GamesUrl : string = 'http://localhost:3000/api/games'

  constructor(private http : HttpClient, private authService : AuthService) { }

  getGames():Observable<Jeux[]>{
    return this.http.get<Jeux[]>(this.GamesUrl,this.httpOptions)

  }
  getGamess():Observable<Jeux[]>{
    return this.http.get<Jeux[]>(this.GamesUrl+'/get',this.httpOptions)

  }
  addGames(Jeux: Jeux): Observable<Jeux> {
    return this.http.post<Jeux>(this.GamesUrl, Jeux,this.httpOptions);
  }
  deleteGames(id: any): Observable<any> {
    return this.http.delete<Jeux>(this.GamesUrl + '/' + id,this.httpOptions);
  }

  getGamesById(id: any): Observable<Jeux> {
    return this.http.get<Jeux>(this.GamesUrl+ '/' + id,this.httpOptions);
  }
  updateGames(id: number, Jeux: Jeux): Observable<Jeux> {
    return this.http.put<Jeux>(this.GamesUrl + '/' + id, Jeux, this.httpOptions);
  }
}

