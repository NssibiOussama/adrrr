import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token = this.authService.token;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': this.token })
  };
  userUrl : string = 'http://localhost:3000/users'
  

  constructor(private http : HttpClient, private authService : AuthService) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.userUrl,this.httpOptions)

  }
  
  deleteUser(id: any): Observable<any> {
    return this.http.delete<User>(this.userUrl + '/delete/' + id,this.httpOptions);
  }

  getUser(id: any): Observable<User> {
    return this.http.get<User>(this.userUrl + '/' + id,this.httpOptions);
  }
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(this.userUrl + '/update/' + id, user, this.httpOptions);
  }

  searchUsers(str:string):Observable<User[]>{
    return this.http.get<User[]>(this.userUrl+'/searchusers?search='+str,this.httpOptions)

  }
}
