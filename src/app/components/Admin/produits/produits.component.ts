import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../../models/user.model'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProduitsService } from 'src/app/services/produitsService/produits.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css', '../../../../assets/integration/assets/vendor/css/core.css', '../../../../assets/integration/assets/vendor/css/theme-default.css', '../../../../assets/integration/assets/css/demo.css', '../../../../assets/integration/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css']
})
export class ProduitsComponent implements OnInit {

  formProducts: FormGroup = new FormGroup({
    type: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  isFormSubmitted = false;
  id: any;
  products: any[];
  product: any;
  //
  constructor(private produitService: ProduitsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ngServiceLoadere: NgxUiLoaderService,) { }

  ngOnInit(): void {
    this.loadForm()
    this.getProducts()
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.id = params.get('id');
        this.getProductById(params.get('id'));
      }
    });
  }
  get productControls(): { [key: string]: AbstractControl } {
    return this.formProducts.controls;
  }
  loadForm() {
    this.formProducts = this.formBuilder.group({
      name: [this.product?.name, Validators.required],
      description: [this.product?.description, [Validators.required, Validators.minLength(8)]],
      price: [this.product?.price, [Validators.required, Validators.min(1)]],
      quantity: [this.product?.quantity, [Validators.required, Validators.min(0)]]

    });

  }
  getProductById(id: any) {
    this.produitService.getProduct(id).subscribe((response: any) => {
      if (response) {
        this.product = response
        this.loadForm()
      }
    },
      error => {
        console.log(error)
      });
  }
  successNotification() {
    Swal.fire("", 'Supprimé avec succés!', 'success');

  }
  getProducts() {
    this.produitService.getAllProductsAdmin().subscribe((data) => {
      this.products = data;
    })

  }
  onReset() {
    this.isFormSubmitted = false;
    this.formProducts.reset();

  }

  deleteProduct(id: number) {
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
        this.produitService.deleteProduct(id).subscribe(
          (response: any) => {
            console.log(response)
            this.successNotification()
          },
          error => {
            this.ngServiceLoadere.stop();
          },
          () => {
            this.ngServiceLoadere.stop();
            this.getProducts();
          }

        );
      }
    });

  }
  onSubmit() {

  }
  updateProduct() {
    this.isFormSubmitted = true
    if (this.formProducts.invalid) {
      return;
    }
    this.produitService.updateProduct(this.formProducts.value, this.id).subscribe((data) => this.router.navigateByUrl('/admin/produits')
    )
  }
}
