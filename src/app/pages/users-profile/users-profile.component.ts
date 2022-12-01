import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {
  user!: User;
  updatedUser!: User;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.user;
    this.updatedUser = this.user;
  }

  update(){
    
  }

}
