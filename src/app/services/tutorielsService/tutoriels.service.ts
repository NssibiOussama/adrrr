import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutoriel } from 'src/app/models/tutoriel.model';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class TutorielsService {
  token = this.authService.token;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };
  TutorielsUrl: string = 'http://localhost:3000/api/tutorials'


  constructor(private http: HttpClient, private authService: AuthService) { }

  getTutoriels(): Observable<Tutoriel[]> {
    return this.http.get<Tutoriel[]>(this.TutorielsUrl, this.httpOptions)

  }
  addTutoriel(tuto: Tutoriel): Observable<Tutoriel> {
    return this.http.post<Tutoriel>(this.TutorielsUrl, tuto, this.httpOptions);
  }
  deleteTutoriel(id: any): Observable<any> {
    return this.http.delete<Tutoriel>(this.TutorielsUrl + '/' + id, this.httpOptions);
  }

  getTutorielById(id: any): Observable<Tutoriel> {
    return this.http.get<Tutoriel>(this.TutorielsUrl + '/' + id, this.httpOptions);
  }
  updateTutoriel(id: number, tuto: Tutoriel): Observable<Tutoriel> {
    return this.http.put<Tutoriel>(this.TutorielsUrl + '/' + id, tuto, this.httpOptions);
  }
}
