import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import { CompetitorsTeams } from 'src/app/models/CompetitorTeam.model';
import { CompetitorsTeamsService } from 'src/app/services/CompetitorTeamService/competitors-teams.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-competiteurstemas',
  templateUrl: './competiteurstemas.component.html',
  styleUrls: ['./competiteurstemas.component.css', '../../../../assets/integration/assets/vendor/css/core.css', '../../../../assets/integration/assets/vendor/css/theme-default.css', '../../../../assets/integration/assets/css/demo.css', '../../../../assets/integration/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css',]
})

  

export class CompetitorsTeamsComponent implements OnInit {

  listCompetitorsTeams : CompetitorsTeams[]=[]
  constructor(
  private competitorService: CompetitorsTeamsService,

  private router: Router, 

  private ngServiceLoadere: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
  this.getCompetitorsTeams()
  }
  getCompetitorsTeams() {
    this.competitorService.getCompetitorsTeams().subscribe((data) => this.listCompetitorsTeams = data)

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
        this.competitorService.deleteCompetitorTeam(id).subscribe(
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
            this.getCompetitorsTeams();
          }
  
        );
      }
    });
  }

}
