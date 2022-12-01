import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../../services/commandeService/commande.service'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css','../../../../assets/integration/assets/vendor/css/core.css', '../../../../assets/integration/assets/vendor/css/theme-default.css', '../../../../assets/integration/assets/css/demo.css', '../../../../assets/integration/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css',]
})
export class CommandesComponent implements OnInit {
  orders: any[] = [];
  constructor(private commandeService: CommandeService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }


  getAllOrders() {
    this.commandeService.getAllOrders().subscribe(data => this.orders = data);
  }

  confirm(id: number, v:any) {
    let toggledValue = !v;
    this.commandeService.update(id,toggledValue).subscribe(data => this.getAllOrders())
  }


  delete(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Vous ne pourrez pas revenir en arrière!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer la commande!',
      cancelButtonText: 'Non, annuler',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.commandeService.deleteOrder(id).subscribe(data => {
          this.getAllOrders();
          this.successNotification();
        },
          error => {
            Swal.fire({
              title: '',
              text: error.error,
              icon: 'warning',
              showCancelButton: false,
              confirmButtonText: 'OK',
            })
          })
      }
    })
  }
  successNotification() {
    Swal.fire("", 'Supprimé avec succés!', 'success');

  }

}
