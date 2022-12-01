import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { PanierService } from 'src/app/services/panierService/panier.service';
import { CommandeService } from 'src/app/services/commandeService/commande.service'
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;

  formAdresse: FormGroup = new FormGroup({
    adresse: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  isFormSubmitted = false;

  private _productNumber$ = new BehaviorSubject<number>(0);
  productNumber$ = this._productNumber$.asObservable();

  nombreDeProduits = 0;
  userId!: number;
  produits!: Product[];
  searchText!: string;
  total: number = 0;
  showModal = true;
  adresseDeLivraison: string;
  constructor(private commandeService: CommandeService, private formBuilder: FormBuilder,
    private panierService: PanierService, private authService: AuthService, private ngServiceLoadere: NgxUiLoaderService, private router: Router,

  ) {
    this.userId = this.authService.user.userId;
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.loadForm();
  }
  get adresseControls(): { [key: string]: AbstractControl } {
    return this.formAdresse.controls;
  }
  loadForm() {
    this.formAdresse = this.formBuilder.group({

      adresse: [this.adresseDeLivraison, Validators.required],
    });

  }

  getAllProducts() {
    this.panierService.getAllProducts(this.userId).subscribe(data => {
      this.produits = data;
      this.total = 0;
      this.nombreDeProduits = 0;
      this.produits.map(p => {
        this.total = this.total + p.price * p.quantity;
        this.nombreDeProduits += p.quantity;
      })
      this._productNumber$.next(this.produits.length);
    })
  }

  deleteProductFromCart(id: number) {
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
        this.panierService.deleteProductFromCart(id, this.userId).subscribe(data => {
          this.getAllProducts();
          this.successNotification("supprimé avec succés");
        })
      }
    });

  }

  searchProducts(search: string) {

  }

  incrementQuantity(p: any) {
    p.quantity++;
    this.panierService.update(p, this.userId).subscribe(data => this.getAllProducts())
  }

  successNotification(str: string) {
    Swal.fire("", str, 'success');
  }

  decrementQuantity(p: any) {
    p.quantity > 1 && p.quantity--;
    this.panierService.update(p, this.userId).subscribe(data => this.getAllProducts())
  }



  order() {
    this.isFormSubmitted = true
    if (this.formAdresse.invalid) {
      return;
    }
    let btn = window.document.getElementById("close");
    this.adresseDeLivraison = this.formAdresse.value.adresse;
    this.commandeService.addOrder({ products: this.produits, user_id: this.userId, price: this.total, adresse: this.adresseDeLivraison }).subscribe(res => {
      this.successNotification("Commande passée avec succés!");
      btn?.click();
      this.router.navigate(['/user/produits'])

    })
  }

  deleteAllProductsFromCart() {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Vous ne pourrez pas revenir en arrière!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, vider mon panier!',
      cancelButtonText: 'Non, annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.panierService.deleteCart(this.userId).subscribe(res => {
          this.router.navigate(['/user/produits']);
          Swal.fire("", "Panier vidé avec succés", 'success')
        }
        )
      }
    });


  }
}


