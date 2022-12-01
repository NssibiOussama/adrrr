
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Reclamation  } from 'src/app/models/report.model';
import { ReportService } from 'src/app/services/reportService/report.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.css', '../../../../assets/integration/assets/vendor/css/core.css', '../../../../assets/integration/assets/vendor/css/theme-default.css', '../../../../assets/integration/assets/css/demo.css', '../../../../assets/integration/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css',]
})
export class ReclamationsComponent implements OnInit {

  listRport : Reclamation[]=[]
  constructor(
  private reportService: ReportService,

  private router: Router, 

  private ngServiceLoadere: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
  this.getreports()
  }
  getreports() {
    this.reportService.getReclamation().subscribe((data) => this.listRport = data)

  }
  successNotification() {
    Swal.fire("",'Supprimé avec succés!', 'success');

  }
  delete(id:any) {
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
        this.reportService.deleteReport(id).subscribe(
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
            this.getreports();
          }
  
        );
      }
    });
  }

}
