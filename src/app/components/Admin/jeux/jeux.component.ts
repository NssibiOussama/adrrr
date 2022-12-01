
import { Component, OnInit } from '@angular/core';
import { Jeux } from 'src/app/models/jeux.model';
import { CategorieDeJeux } from 'src/app/models/categorieJeux.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import { JeuxService } from 'src/app/services/JeuxService/jeux.service';
import { CatergorieJeuxServiceService } from 'src/app/services/categorieJeux/catergorie-jeux-service.service';


@Component({
  selector: 'app-jeux',
  templateUrl: './jeux.component.html',
  styleUrls: ['./jeux.component.css', '../../../../assets/integration/assets/vendor/css/core.css', '../../../../assets/integration/assets/vendor/css/theme-default.css', '../../../../assets/integration/assets/css/demo.css', '../../../../assets/integration/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css',]
})
export class JeuxComponent implements OnInit {

  formGames: FormGroup = new FormGroup({
    game_name: new FormControl(''),
    description: new FormControl(''),
    categorie_id: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  isFormSubmitted = false;
  gameList: Jeux[] = []
  categoriesList: CategorieDeJeux[] = []
  action = 'Ajouter'
  inEdit = false;
  jeux: Jeux = new Jeux()
  id: any;

  constructor(
    private JeuxService: JeuxService,
      private formBuilder: FormBuilder,
      private Router: Router, 
      private Route: ActivatedRoute,
      private ngServiceLoadere: NgxUiLoaderService,
      private gameCategoriesService : CatergorieJeuxServiceService
  ) { }

  ngOnInit(): void {
    this.loadForm()
    this.getGames()
    this.getCategories()
    this.jeux = new Jeux()
    this.Route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.id = params.get('id');
        this.action = 'Modifier';
        this.inEdit = true;
        this.getById(params.get('id'));
      }
    });

  }

  get GamesControls(): { [key: string]: AbstractControl } {
    return this.formGames.controls;
  }
  loadForm() {
    this.formGames = this.formBuilder.group({
      game_name : [this.jeux.game_name, [Validators.required,Validators.minLength(5),Validators.maxLength(15)]], 
      description : [this.jeux.description, [Validators.required,Validators.minLength(10),Validators.maxLength(20)]],
      categorie_id:[this.jeux.categorie_id, Validators.required],
    });

  }

  successNotification() {
    Swal.fire("",'Supprimé avec succés!', 'success');

  }
  getGames() {
    this.JeuxService.getGamess().subscribe((data) =>{ this.gameList = data})

  }
  getCategories() {
    this.gameCategoriesService.getCategories().subscribe((data) => this.categoriesList = data)

  }

  onReset() {
    this.isFormSubmitted = false;
    this.formGames.reset();

  }
  edit() {
    this.action = 'Modifier'
    this.inEdit = true;
  }
  onSubmit() {
    this.isFormSubmitted = true
    if (this.formGames.invalid) {
      return;
    }
    this.JeuxService.addGames(this.formGames.value).subscribe(
      (data)=>{
        this.getGames()
      this.onReset()
    },
      // error=>{
      //   Swal.fire({
      //     title: '',
      //     text: error.error,
      //     icon: 'warning',
      //     showCancelButton: false,
      //     confirmButtonText: 'OK',

      //   })}
    )
    
   
  }
  getById(id: any) {
    this.JeuxService.getGamesById(id).subscribe((response: any) => {
      if (response) {
        this.jeux = response[0];
        console.log(this.jeux)
        this.loadForm()
      }
    },
      error => {
        console.log(error)
      });
  }

  updateGame(){
    this.isFormSubmitted = true
    if (this.formGames.invalid) {
      return;
    }
    this.JeuxService.updateGames(this.id,this.formGames.value).subscribe((data)=>this.Router.navigateByUrl('/admin/jeux')
    )
  }
  delete(Catid:any) {
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
        this.JeuxService.deleteGames(Catid).subscribe(
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
            this.getGames();
          }
  
        );
      }
    });
  }
  
  
}

