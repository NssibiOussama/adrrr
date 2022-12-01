import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email!:string;
  password!:string;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => 
      {      
        isLoggedIn && router.navigate([`${this.authService.user.role}`]);
      } )
   }

  ngOnInit(): void {
  }
  login(){
    this.authService.login(this.email,this.password).subscribe((data) => this.router.navigate([`${this.authService.user.role}`]),
    err => alert(err.error.msg))
  }

}
