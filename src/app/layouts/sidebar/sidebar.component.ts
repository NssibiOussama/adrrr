import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  role!:any;
  constructor(private authService : AuthService) {
    this.role = this.authService.user.role ;

   }

  ngOnInit(): void {
  }

}
