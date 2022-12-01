import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from 'src/app/models/report.model';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  token = this.authService.token;
  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };
  reportUrl : string = 'http://localhost:3000/api/reports'

  constructor(private http : HttpClient, private authService : AuthService) { }

  getReclamation():Observable<Reclamation[]>{
    return this.http.get<Reclamation[]>(this.reportUrl,this.httpOptions)

  }

  deleteReport(id: any): Observable<any> {
    return this.http.delete<Reclamation>(this.reportUrl + '/' + id,this.httpOptions);
  }


}

