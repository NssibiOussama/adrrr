import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  token = this.authService.token;
  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };
  dashboardUrl : string = 'http://localhost:3000/api/dashboard'
  
  constructor(private http : HttpClient, private authService : AuthService) { }
  getNbTutorials():Observable<any>{
    return this.http.get<any>(this.dashboardUrl+'/tutorials',this.httpOptions)

  }
  getcurrentTutorialsNb():Observable<any>{
    return this.http.get<any>(this.dashboardUrl+'/currentTutorials',this.httpOptions)

  }
  getNbProducts():Observable<any>{
    return this.http.get<any>(this.dashboardUrl+'/products',this.httpOptions)

  }
  getcurrentProductsNb():Observable<any>{
    return this.http.get<any>(this.dashboardUrl+'/currentProducts',this.httpOptions)

  }
  getNbTournaments():Observable<any>{
    return this.http.get<any>(this.dashboardUrl+'/tournaments',this.httpOptions)

  }
  getcurrentTournamentsNb():Observable<any>{
    return this.http.get<any>(this.dashboardUrl+'/currentTournaments',this.httpOptions)

  }
  getNbGames():Observable<any>{
    return this.http.get<any>(this.dashboardUrl+'/games',this.httpOptions)

  }
  getcurrentGamesNb():Observable<any>{
    return this.http.get<any>(this.dashboardUrl+'/currentGames',this.httpOptions)

  }
  getNbTeams():Observable<any>{
    return this.http.get<any>(this.dashboardUrl+'/teams',this.httpOptions)

  }
  getcurrentTeamsNb():Observable<any>{
    return this.http.get<any>(this.dashboardUrl+'/currentTeams',this.httpOptions)

  }
  getNbOrdres():Observable<any>{
    return this.http.get<any>(this.dashboardUrl+'/orders',this.httpOptions)

  }
  getcurrentOrdersNb():Observable<any>{
    return this.http.get<any>(this.dashboardUrl+'/currentOrders',this.httpOptions)

  }
  getNbReports():Observable<any>{
    return this.http.get<any>(this.dashboardUrl+'/reports',this.httpOptions)

  }
  getcurrentReportsNb():Observable<any>{
    return this.http.get<any>(this.dashboardUrl+'/currentReports',this.httpOptions)

  }
  getNbUsers():Observable<any>{
    return this.http.get<any>(this.dashboardUrl+'/users',this.httpOptions)

  }
  getcurrentUsersNb():Observable<any>{
    return this.http.get<any>(this.dashboardUrl+'/currentUsers',this.httpOptions)

  }
  getAvailableTournaments():Observable<any>{
    return this.http.get<any>(this.dashboardUrl+'/availableTournaments',this.httpOptions)

  }
  


}
