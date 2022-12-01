import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { PanierService } from 'src/app/services/panierService/panier.service';
import { ProduitsService } from 'src/app/services/produitsService/produits.service';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  userId!: number;
  produits: Product[] = [];
  mesproduits: Product[] = [];
  searchText!: string;;

  constructor(private produitService: ProduitsService, private router: Router, private panierService: PanierService, private authService: AuthService, private ngServiceLoadere: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getMyProducts();
    this.userId = this.authService.user.userId;

  }
  async getAllProducts() {
    await this.produitService.getAllProducts().subscribe(response => {
      console.log(response)
      this.produits = response;
    });
  }
  async getMyProducts() {
    await this.produitService.getMyProducts().subscribe(response => {
      this.mesproduits = response;
    });

  }
  successNotification() {
    Swal.fire("", 'Supprimé avec succés!', 'success');

  }

  async deleteProduct(id: number) {
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
        this.produitService.deleteProduct(id).subscribe((response) => {
          this.getMyProducts();
        },
          error => Swal.fire({
            title: 'Erreur',
            text: error.error,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Ok',
            reverseButtons: true
          }));

      }
    });

  }
  updateProduct(id: number) {
    this.router.navigate(['/updateproduct/', id])
  }
  async searchProducts(search: string) {
    await this.produitService.searchProducts(search, this.userId).subscribe(response => {
      console.log(response)
      this.produits = response;
    });

  }

  addToCart(p: number) {

    
    this.panierService.addProduct(p, this.userId).subscribe((response) => {
      Swal.fire("", 'Ajouté au panier avec succés', 'success');
    },
      error => Swal.fire({
        title: 'Erreur',
        text: error.error,
        icon: 'warning',
        showCancelButton: false,
      }));


  };















}


