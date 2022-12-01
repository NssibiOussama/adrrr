import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategorieDeJeux } from 'src/app/models/categorieJeux.model';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class CatergorieJeuxServiceService {
  token = this.authService.token;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };
  CategoriesUrl: string = 'http://localhost:3000/api/categorieJeux'


  constructor(private http: HttpClient, private authService: AuthService) { }

  getCategories(): Observable<CategorieDeJeux[]> {
    return this.http.get<CategorieDeJeux[]>(this.CategoriesUrl, this.httpOptions)

  }
  addCategorie(cat: CategorieDeJeux): Observable<CategorieDeJeux> {
    return this.http.post<CategorieDeJeux>(this.CategoriesUrl, cat, this.httpOptions);
  }
  deleteCategorie(id: any): Observable<any> {
    return this.http.delete<CategorieDeJeux>(this.CategoriesUrl + '/' + id, this.httpOptions);
  }

  getCategorieById(id: any): Observable<CategorieDeJeux> {
    return this.http.get<CategorieDeJeux>(this.CategoriesUrl + '/' + id, this.httpOptions);
  }
  updateCategorie(id: number, cat: CategorieDeJeux): Observable<CategorieDeJeux> {
    return this.http.put<CategorieDeJeux>(this.CategoriesUrl + '/' + id, cat, this.httpOptions);
  }
}
