import { NotificationService } from './../../../services/NotificationService/notification.service';
import { Component, OnInit } from '@angular/core';


import { AuthService } from '../../../services/auth.service';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { NotificationTournois } from '../../../models/NotificationTournois';


@Component({
  selector: 'app-notifications-tournois',
  templateUrl: './notifications-tournois.component.html',
  styleUrls: ['./notifications-tournois.component.css', '../../../../assets/integration/assets/vendor/css/core.css', '../../../../assets/integration/assets/vendor/css/theme-default.css', '../../../../assets/integration/assets/css/demo.css', '../../../../assets/integration/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css',]
})
export class NotificationsTournoisComponent implements OnInit {
  listNotification: NotificationTournois[] = [];




  constructor(private serviceNotification: NotificationService,

    private ngServiceLoadere: NgxUiLoaderService,
    private authService: AuthService,

  ) { }

  ngOnInit(): void {
    this.getNotificationTournois()
  }

  successNotification() {
    Swal.fire("", 'Supprimé avec succés!', 'success');

  }
  ApprouvationNotification() {
    Swal.fire("", 'Approuvé avec succés!', 'success');

  }
  getNotificationTournois() {
    this.serviceNotification.getNotificationTournois().subscribe((data) => this.listNotification = data)

  }

  delete(id: any) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Vous ne pourrez pas revenir en arrière!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprime-le!',
      cancelButtonText: 'Non, annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.ngServiceLoadere.start();
        this.serviceNotification.deleteNotification(id).subscribe(
          (response: any) => {
            this.successNotification()
          },
          error => {
            console.log(error);
            Swal.fire({
              title: '',
              text: error.error,
              icon: 'warning',
              showCancelButton: false,
              confirmButtonText: 'OK',
            })
            this.ngServiceLoadere.stop();

          },
          () => {
            this.ngServiceLoadere.stop();
            this.getNotificationTournois();
          }

        );
      }
    });
  }

  approuverNotification(id: any,tournois_id:any) {



    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Vous ne pourrez pas revenir en arrière!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprime-le!',
      cancelButtonText: 'Non, annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.ngServiceLoadere.start();
        this.serviceNotification.VerifierNotification(tournois_id).subscribe(
          (response: any) => {
             
            Swal.fire("", 'Approuvé avec succés!', 'success').then((result)=>{
              if (result.isConfirmed){
                this.serviceNotification.deleteNotification(id).subscribe(
                  (response: any) => {
                    this.successNotification()
                    this.getNotificationTournois();},
                  () => {
                    this.ngServiceLoadere.stop();

                  }

                );
              }

            })
            this.getNotificationTournois();
          },
          () => {this.ngServiceLoadere.stop(); });


      }
    });


  }

}
