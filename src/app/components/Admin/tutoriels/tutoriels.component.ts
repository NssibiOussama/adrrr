import { Component, OnInit } from '@angular/core';
import { Tutoriel } from 'src/app/models/tutoriel.model';
import { TutorielsService } from 'src/app/services/tutorielsService/tutoriels.service';
import { JeuxService } from 'src/app/services/JeuxService/jeux.service';
import { Jeux } from 'src/app/models/jeux.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/services/auth.service';
import { VideoUplaodService } from 'src/app/services/videoUpload/video-uplaod.service';



class VideoSnipet {
  constructor(public src: string, public file: File) { }
}


@Component({
  selector: 'app-tutoriels',
  templateUrl: './tutoriels.component.html',
  styleUrls: ['./tutoriels.component.css', '../../../../assets/integration/assets/vendor/css/core.css', '../../../../assets/integration/assets/vendor/css/theme-default.css', '../../../../assets/integration/assets/css/demo.css', '../../../../assets/integration/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css']
})
export class TutorielsComponent implements OnInit {
  loading = false;
  formTutoriels: FormGroup = new FormGroup({
    user_id: new FormControl(''),
    video: new FormControl(''),
    description: new FormControl(''),
    game_id: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  isFormSubmitted = false;
  action = 'Ajouter'
  listTutoriels: Tutoriel[] = []
  listGames: Jeux[] = []
  url: string = ""
  inEdit = false;
  tutorial: Tutoriel = new Tutoriel()
  selectedFile!: VideoSnipet;
  id: any;
  constructor(
    private serviceTutoriels: TutorielsService,
    private serviceGames: JeuxService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ngServiceLoadere: NgxUiLoaderService,
    private authService: AuthService,
    private videoUpload: VideoUplaodService

  ) { }

  ngOnInit(): void {
    this.loadForm()
    this.getTutoriels()
    this.getTutoriels()
    this.getGames()
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.id = params.get('id');
        this.action = 'Modifier';
        this.inEdit = true;
        this.getById(params.get('id'));
      }
    });
  }
  get tutorialsControls(): { [key: string]: AbstractControl } {
    return this.formTutoriels.controls;
  }
  loadForm() {
    this.formTutoriels = this.formBuilder.group({
      user_id: [this.tutorial.user_id, ''],
      video: [this.tutorial.video, Validators.required],
      game_id: [this.tutorial.game_id, Validators.required],
      description: [this.tutorial.description, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });

  }
  successNotification() {
    Swal.fire("", 'Supprimé avec succés!', 'success');

  }
  onReset() {
    this.isFormSubmitted = false;
    this.formTutoriels.reset();
    this.router.navigate(['/admin/tutoriels'])

  }
  getById(id: any) {
    this.serviceTutoriels.getTutorielById(id).subscribe((response: any) => {
      if (response) {
        this.tutorial = response[0];
        console.log(this.tutorial)
        this.loadForm()
      }
    },
      error => {
        console.log(error)
      });
  }
  getTutoriels() {
    this.serviceTutoriels.getTutoriels().subscribe((data) => this.listTutoriels = data)

  }
  getGames() {
    this.serviceGames.getGames().subscribe((data) => this.listGames = data)

  }
  onSubmit(videoInput: any) {
    this.isFormSubmitted = true
    if (this.formTutoriels.invalid) {
      return;
    }


    this.loading = true;
    this.tutorial.user_id = this.authService.user.userId;
    this.tutorial.game_id = this.formTutoriels.value.game_id
    this.tutorial.description = this.formTutoriels.value.description
    console.log(this.authService.user.userId)
    const file: File = videoInput.files[0];
    
    if (file == null) {
      this.loading = false;
      return alert('Veuillez selectionner une video ! ...');

    }
    if (file != null) {
      const reader = new FileReader();
      reader.addEventListener('load', async (event: any) => {
        this.selectedFile = new VideoSnipet(event.target.result, file);
        (await this.videoUpload.uploadFile(this.selectedFile.file)).subscribe(res => {
          this.tutorial.video = res.secure_url;
          this.serviceTutoriels.addTutoriel(this.tutorial).subscribe(data => { this.router.navigate(['/admin/tutoriels']) });
          this.loading = false;
          this.onReset()
          this.getTutoriels()
        })
      });
      reader.readAsDataURL(file);
    }
    }


  

  edit() {
    this.action = 'Modifier'
    this.inEdit = true;
  }

  delete(id: any) {
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
        this.serviceTutoriels.deleteTutoriel(id).subscribe(
          (response: any) => {
            this.successNotification()
          },
          error => {
            this.ngServiceLoadere.stop();
          },
          () => {
            this.ngServiceLoadere.stop();
            this.getTutoriels();
          }


        );
      }
    });
  }

  updateTutoriels(videoInput: any) {
    this.isFormSubmitted = true
    if (this.formTutoriels.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.authService.user.userId)
    const file: File = videoInput.files[0];
    if (file == null) {
      this.loading = false;
      return alert('Veuillez selectionner une video ! ...');

    }
    if (file != null) {
      const reader = new FileReader();
      reader.addEventListener('load', async (event: any) => {
        this.selectedFile = new VideoSnipet(event.target.result, file);
        (await this.videoUpload.uploadFile(this.selectedFile.file)).subscribe(res => {
          this.formTutoriels.value.video = res.url;
          this.serviceTutoriels.updateTutoriel(this.id, this.formTutoriels.value).subscribe(data => { this.router.navigate(['/admin/tutoriels']) });
          this.loading = false;
          this.onReset()
          this.getTutoriels()
        })
      });
      reader.readAsDataURL(file);
    }
    }

  }


