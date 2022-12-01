import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import { Competitors } from 'src/app/models/competitor.model';
import { CompetitorService } from 'src/app/services/competitorService/competitor.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-competiteurs',
  templateUrl: './competiteurs.component.html',
  styleUrls: ['./competiteurs.component.css', '../../../../assets/integration/assets/vendor/css/core.css', '../../../../assets/integration/assets/vendor/css/theme-default.css', '../../../../assets/integration/assets/css/demo.css', '../../../../assets/integration/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css',]
})
export class CompetiteursComponent implements OnInit {
listCompetitors : Competitors[]=[]
  constructor(
    private competitorService: CompetitorService,

    private router: Router, 

    private ngServiceLoadere: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.getCompetitors()
  }
  getCompetitors() {
    this.competitorService.getCompetitors().subscribe((data) => this.listCompetitors = data)

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
        this.competitorService.deleteCompetitor(id).subscribe(
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
            this.getCompetitors();
          }
  
        );
      }
    });
  }
}
