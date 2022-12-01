import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { NotificationTournois } from 'src/app/models/NotificationTournois';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  token = this.authService.token;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };


notificationTournoisURL: string = 'http://localhost:3000/api/notification'


  constructor(private http : HttpClient, private authService:AuthService) { }

  getNotificationTournois():Observable<NotificationTournois[]>{
    return this.http.get<NotificationTournois[]>(this.notificationTournoisURL,this.httpOptions)
}

ApprouverNotification(id: number, Notif: NotificationTournois): Observable<NotificationTournois> {
  return this.http.put<NotificationTournois>(this.notificationTournoisURL + '/' + id, Notif, this.httpOptions);
}
VerifierNotification(tournois_id : number): Observable<any> {
  return this.http.put<any>(this.notificationTournoisURL + '/tournois/' + tournois_id ,   this.httpOptions);
}

deleteNotification(id: any): Observable<any> {
  return this.http.delete<NotificationTournois>(this.notificationTournoisURL + '/' + id,this.httpOptions);
}

}
