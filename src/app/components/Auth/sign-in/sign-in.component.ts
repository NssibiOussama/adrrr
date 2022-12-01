import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css','../../../../assets/login-css/style.css']
})
export class SignInComponent implements OnInit {
  nom!:string;
  prenom!:string;
  email!:string;
  password!:string;
  confirmPassword!:string;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => 
      {
        (isLoggedIn && this.authService.user.role=='admin') && router.navigate(['/admin']);
        (isLoggedIn && this.authService.user.role=='user') && router.navigate(['/user'])
      } )
   }

  ngOnInit(): void {
  }

  signup(){
    this.authService.signup(this.nom, this.prenom, this.email, this.password).subscribe((data) => {
      alert("Bienvenu ! Votre compte a été creé avec succés.\nVeuillez vous connecter.");
      this.router.navigate(['/login'])
    },
    err => alert(err.error.msg))
  }

}
