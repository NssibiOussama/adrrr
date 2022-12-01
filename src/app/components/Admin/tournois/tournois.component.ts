import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Tournois } from 'src/app/models/Tournois.model';
import { TournoisServiceService } from '../../../services/Tournois/tournois-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { ImageUploadService } from 'src/app/services/imageUpload/image-upload.service';
import { JeuxService } from 'src/app/services/JeuxService/jeux.service';
import { TypeTournoisService } from 'src/app/services/TypeTournois/type-tournois.service';
import { Jeux } from 'src/app/models/jeux.model';
import {  TournoisType } from 'src/app/models/TournoisType.model';
import { ThisReceiver } from '@angular/compiler';



class Imagesnipet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-tournois',
  templateUrl: './tournois.component.html',
  styleUrls: ['./tournois.component.css', '../../../../assets/integration/assets/vendor/css/core.css', '../../../../assets/integration/assets/vendor/css/theme-default.css', '../../../../assets/integration/assets/css/demo.css', '../../../../assets/integration/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css',]
})
export class TournoisComponent implements OnInit {
  formTournois: FormGroup = new FormGroup({
    user_id: new FormControl(''),
    name: new FormControl(''),
    date: new FormControl(''),
    competitors_number: new FormControl(''),
    image_tournois: new FormControl(''),
    game_id: new FormControl(''),
    tournament_type_id: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  isFormSubmitted = false;
  action = 'Ajouter'
  listTournois: Tournois[] = []
  loading = false;
  inEdit = false;
  id :any;
  listGames : Jeux[]=[]
  listTypeTournois : TournoisType[]=[]


  tournois: Tournois = new Tournois()
  selectedFile!: Imagesnipet;

  constructor(private serviceTournois: TournoisServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ngServiceLoadere: NgxUiLoaderService,
    private authService: AuthService,
    private imageupload:ImageUploadService,
    private serviceGames : JeuxService,
    private serviceTypeTournois :TypeTournoisService
    ) { }

  ngOnInit(): void {
    this.loadForm()
    this.getTournois()
    this.getGames()
    this.getTypeTournois()
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.id = params.get('id');
        this.action = 'Modifier';
        this.inEdit = true;
        this.getById(params.get('id'));
      }
    });

  }
  get TournoisControls(): { [key: string]: AbstractControl } {
    return this.formTournois.controls;
  }

  loadForm() {
    this.formTournois = this.formBuilder.group({
      user_id: [this.tournois.user_id, ''],
      name: [this.tournois.name, [Validators.required,Validators.minLength(10),Validators.maxLength(25)]],
      date: [this.tournois.date, Validators.required],
      competitors_number: [this.tournois.competitors_number, [Validators.required,Validators.max(50),Validators.min(20)]],
      image_tournois: [this.tournois.image_tournois, Validators.required],
      tournament_type_id: [this.tournois.tournament_type_id, Validators.required],
      // verified: [this.tournois.verified, Validators.required],

      game_id: [this.tournois. game_id, Validators.required],
    });

  }
  successNotification() {
    Swal.fire("", 'Supprimé avec succés!', 'success');

  }
  getGames() {
    this.serviceGames.getGames().subscribe((data) => this.listGames = data)

  }

  getTournois() {
    this.serviceTournois.getTournois().subscribe((data) => this.listTournois = data)

  }
  onReset() {
    this.isFormSubmitted = false;
    this.formTournois.reset();

  }
  edit() {
    this.action = 'Modifier'
    this.inEdit = true;
  }

  onSubmit(imageInput: any) {
    // this.isFormSubmitted = true
    // if (this.formTournois.invalid) {
    //   return;
    // }

    console.log(this.formTournois.value)

    this.loading = true;
    this.tournois.user_id = this.authService.user.userId;
    this.tournois.name = this.formTournois.value.name
    this.tournois.date = this.formTournois.value.date
    this.tournois.game_id = this.formTournois.value.game_id
    this.tournois.competitors_number = this.formTournois.value.competitors_number
    this.tournois.image_tournois = this.formTournois.value.image_tournois


    this.tournois.tournament_type_id = this.formTournois.value.tournament_type_id


    console.log(this.authService.user.userId)
    const file: File = imageInput.files[0];

    if (file == null) {
      this.loading = false;
      return alert('Veuillez selectionner une Photo ! ...');

    }
    if (file != null) {


      const reader = new FileReader();
      reader.addEventListener('load', async (event: any) => {
        this.selectedFile = new Imagesnipet(event.target.result, file);
        (await this.imageupload.uploadFile(this.selectedFile.file)).subscribe(res => {
          this.tournois.image_tournois = res.secure_url;
          this.serviceTournois.addTournois(this.tournois).subscribe(data => {
            this.loading = false;
            this.onReset()
            this.getTournois()
          },(error)=>console.log(error));

        },)
      });
      reader.readAsDataURL(file);
    }


  }










  getById(id: any) {
    this.serviceTournois.getTournoisById(id).subscribe((response: any) => {
      if (response) {
        this.tournois = response[0];
        console.log(this.tournois)
        this.loadForm()
      }
    },
      error => {
        console.log(error)
      });
  }

  updateTournois(imageInput:any) {
    this.isFormSubmitted = true
    if (this.formTournois.invalid) {
      return;
    }


    this.loading = true;
    console.log(this.authService.user.userId)
    const file: File = imageInput.files[0];
    if (file == null) {
      this.loading = false;
      return alert('Veuillez selectionner une photo ! ...');

    }
    if (file != null) {
      const reader = new FileReader();
      reader.addEventListener('load', async (event: any) => {
        this.selectedFile = new Imagesnipet(event.target.result, file);
        (await this.imageupload.uploadFile(this.selectedFile.file)).subscribe(res => {
          this.formTournois.value.image_tournois = res.url;
          this.serviceTournois.updateTournois(this.id,this.formTournois.value).subscribe(data => { this.router.navigate(['/admin/tournois']) });
          this.loading = false;
          this.onReset()
          this.getTournois()
        })
      });
      reader.readAsDataURL(file);
    }

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
        this.serviceTournois.deleteTournois(id).subscribe(
          (response: any) => {
            this.successNotification()
          },
          error => {
            this.ngServiceLoadere.stop();
          },
          () => {
            this.ngServiceLoadere.stop();
            this.getTournois();
          }

        );
      }
    });
  }
  getTypeTournois() {
    this.serviceTypeTournois.getTypeTournois().subscribe((data) => this.listTypeTournois = data)

  }
}
