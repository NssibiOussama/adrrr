import { Component, OnInit } from '@angular/core';
import { CategorieDeJeux } from 'src/app/models/categorieJeux.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CatergorieJeuxServiceService } from 'src/app/services/categorieJeux/catergorie-jeux-service.service';


@Component({
  selector: 'app-categorie-de-jeux',
  templateUrl: './categorie-de-jeux.component.html',
  styleUrls: ['./categorie-de-jeux.component.css', '../../../../assets/integration/assets/vendor/css/core.css', '../../../../assets/integration/assets/vendor/css/theme-default.css', '../../../../assets/integration/assets/css/demo.css', '../../../../assets/integration/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css',]

})
export class CategorieDeJeuxComponent implements OnInit {
  formCategories: FormGroup = new FormGroup({
    type: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  isFormSubmitted = false;
  action = 'Ajouter'
  listCategorie: CategorieDeJeux[] = []
  inEdit = false;
  categorieJeux: CategorieDeJeux = new CategorieDeJeux()
  id: any;
  constructor(
    private serviceCategorie: CatergorieJeuxServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ngServiceLoadere: NgxUiLoaderService,

  ) {

  }

  ngOnInit(): void {
    this.loadForm()
    this.getCategories()
    this.categorieJeux = new CategorieDeJeux()
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.id = params.get('id');
        this.action = 'Modifier';
        this.inEdit = true;
        this.getById(params.get('id'));
      }
    });
  }
  // get CategoriesControls() { return this.formCategories.controls; }
  get CategoriesControls(): { [key: string]: AbstractControl } {
    return this.formCategories.controls;
  }
  loadForm() {
    this.formCategories = this.formBuilder.group({


      type: [this.categorieJeux.type, Validators.required],
    });

  }

  successNotification() {
    Swal.fire("", 'Supprimé avec succés!', 'success');

  }
  getCategories() {
    this.serviceCategorie.getCategories().subscribe((data) => this.listCategorie = data)

  }
  onReset() {
    this.isFormSubmitted = false;
    this.formCategories.reset();

  }
  edit() {
    this.action = 'Modifier'
    this.inEdit = true;
  }
  onSubmit() {
    this.isFormSubmitted = true
    if (this.formCategories.invalid) {
      return;
    }
    this.serviceCategorie.addCategorie(this.formCategories.value).subscribe(
      (data) => {
        this.getCategories()
        this.onReset()
      },
      error => {
        Swal.fire({
          title: '',
          text: error.error,
          icon: 'warning',
          showCancelButton: false,
          confirmButtonText: 'OK',

        })
      }
    )




  }
  getById(id: any) {
    this.serviceCategorie.getCategorieById(id).subscribe((response: any) => {
      if (response) {
        this.categorieJeux = response[0];
        console.log(this.categorieJeux)
        this.loadForm()
      }
    },
      error => {
        console.log(error)
      });
  }

  updateCategorie() {
    this.isFormSubmitted = true
    if (this.formCategories.invalid) {
      return;
    }
    this.serviceCategorie.updateCategorie(this.id, this.formCategories.value).subscribe((data) => this.router.navigateByUrl('/admin/categoriesdejeux')
    )
  }
  delete(Catid: any) {
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
        this.serviceCategorie.deleteCategorie(Catid).subscribe(
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
            this.getCategories();
          }

        );
      }
    });
  }


}
