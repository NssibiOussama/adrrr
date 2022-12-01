import { Component, OnInit, ElementRef } from '@angular/core';
import { DashboardService } from '../../../services/dashboardService/dashboard.service'
import { NotificationService } from './../../../services/NotificationService/notification.service';
import { NotificationTournois } from '../../../models/NotificationTournois';
import { Order } from '../../../models/order.model';
import { Tournois } from '../../../models/Tournois.model';
import { CommandeService } from '../../../services/commandeService/commande.service'





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css',]
})
export class DashboardComponent implements OnInit {
  nbTutorials: number
  currentNbTuto: number
  nbTournaments: number
  currentNbTournaments: number
  nbProducts: number
  currentNbProducts: number
  nbGames: number
  currentNbGames: number
  nbTeams: number
  currentNbTeams: number
  nbOrders: number
  currentNbOrders: number
  nbReports: number
  currentNbReports: number
  nbUsers: number
  currentNbUsers: number
  listNotification: NotificationTournois[] = [];
  orders: Order[] = [];
  listTournois: Tournois[] = [];

  constructor(private elementRef: ElementRef,
    private dashboardService: DashboardService,
    private ServiceNotificationTournois: NotificationService,
    private commandeService: CommandeService) { }

  ngOnInit(): void {
    this.getNbTutorials()
    this.getCurrentTutorialsNb()
    this.getNbTournaments()
    this.getCurrentTournamentsNb()
    this.getNbProducts()
    this.getCurrentProductsNb()
    this.getNbGames()
    this.getCurrentGamesNb()
    this.getNbTeams()
    this.getCurrentTeamsNb()
    this.getNbOrders()
    this.getCurrentOrdersNb()
    this.getNbReports()
    this.getCurrentReportsNb()
    this.getNbUsers()
    this.getCurrentUsersNb()
    this.getNotificationTournois()
    this.getAllOrders()
    this.getTournaments()

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }
  getNbTutorials() {
    return this.dashboardService.getNbTutorials().subscribe((data) => {
      this.nbTutorials = data[0].nb

    })
  }
  getCurrentTutorialsNb() {
    return this.dashboardService.getcurrentTutorialsNb().subscribe((data) => {
      this.currentNbTuto = Math.floor((data[0].nb * 100) / this.nbTutorials)
    })
  }
  getNbTournaments() {
    return this.dashboardService.getNbTournaments().subscribe((data) => {
      this.nbTournaments = data[0].nb

    })
  }
  getCurrentTournamentsNb() {
    return this.dashboardService.getcurrentTournamentsNb().subscribe((data) => {
      this.currentNbTournaments = Math.floor((data[0].nb * 100) / this.nbTournaments)
    })
  }
  getNbProducts() {
    return this.dashboardService.getNbProducts().subscribe((data) => {
      this.nbProducts = data[0].nb

    })
  }
  getCurrentProductsNb() {
    return this.dashboardService.getcurrentProductsNb().subscribe((data) => {
      this.currentNbProducts = Math.floor((data[0].nb * 100) / this.nbProducts)
    })
  }
  getNbGames() {
    return this.dashboardService.getNbGames().subscribe((data) => {
      this.nbGames = data[0].nb

    })
  }
  getCurrentGamesNb() {
    return this.dashboardService.getcurrentGamesNb().subscribe((data) => {
      this.currentNbGames = Math.floor((data[0].nb * 100) / this.nbGames)
    })
  }
  getNbTeams() {
    return this.dashboardService.getNbTeams().subscribe((data) => {
      this.nbTeams = data[0].nb

    })
  }
  getCurrentTeamsNb() {
    return this.dashboardService.getcurrentTeamsNb().subscribe((data) => {
      this.currentNbTeams = Math.floor((data[0].nb * 100) / this.nbTeams)
    })
  }
  getNbOrders() {
    return this.dashboardService.getNbOrdres().subscribe((data) => {
      this.nbOrders = data[0].nb

    })
  }
  getCurrentOrdersNb() {
    return this.dashboardService.getcurrentOrdersNb().subscribe((data) => {
      this.currentNbOrders = Math.floor((data[0].nb * 100) / this.nbOrders)
    })
  }
  getNbReports() {
    return this.dashboardService.getNbReports().subscribe((data) => {
      this.nbReports = data[0].nb

    })
  }
  getCurrentReportsNb() {
    return this.dashboardService.getcurrentReportsNb().subscribe((data) => {
      this.currentNbReports = Math.floor((data[0].nb * 100) / this.nbReports)
    })
  }
  getNbUsers() {
    return this.dashboardService.getNbUsers().subscribe((data) => {
      this.nbUsers = data[0].nb

    })
  }
  getCurrentUsersNb() {
    return this.dashboardService.getcurrentUsersNb().subscribe((data) => {
      this.currentNbUsers = Math.floor((data[0].nb * 100) / this.nbUsers)
    })
  }
  getNotificationTournois() {
    this.ServiceNotificationTournois.getNotificationTournois().subscribe((data) => this.listNotification = data)

  }
  getAllOrders() {
    this.commandeService.getAllOrders().subscribe(data => {
      this.orders = data
    }
    );
  }
  getTournaments() {
    this.dashboardService.getAvailableTournaments().subscribe((data) =>{       
      this.listTournois = data})

  }


}
