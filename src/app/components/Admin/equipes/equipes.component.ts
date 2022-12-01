import { Component, OnInit } from '@angular/core';
import { Equipe } from 'src/app/models/equipe.model';
import { TeamsService } from 'src/app/services/teamsService/teams.service';
import { UserService } from 'src/app/services/userService/user.service';
import { User } from 'src/app/models/user.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/services/auth.service';
import { ImageUploadService } from 'src/app/services/imageUpload/image-upload.service';


class ImageSnipet {
  constructor(public src: string, public file: File) { }
}
@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html',
  styleUrls: ['./equipes.component.css', '../../../../assets/integration/assets/vendor/css/core.css', '../../../../assets/integration/assets/vendor/css/theme-default.css', '../../../../assets/integration/assets/css/demo.css', '../../../../assets/integration/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css']
})
export class EquipesComponent implements OnInit {
  loading = false;
  formEquipe: FormGroup = new FormGroup({
    team_name: new FormControl(''),
    team_image: new FormControl(''),
    leader_id: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  isFormSubmitted = false;
  action = 'Ajouter'
  listEquipe: Equipe[] = []
  listUser: any[] = []
  url: string = ""
  inEdit = false;
  equipe: Equipe = new Equipe()
  selectedFile!: ImageSnipet;
  id: any;
  constructor(
    private teamsService: TeamsService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ngServiceLoadere: NgxUiLoaderService,
    private authService: AuthService,
    private imageUploadService: ImageUploadService

  ) { }

  ngOnInit(): void {
    this.loadForm()
    this.getEquipes()
    this.getUsers()
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.id = params.get('id');
        this.action = 'Modifier';
        this.inEdit = true;
        this.getById(params.get('id'));
      }
    });
  }
  get equipeControls(): { [key: string]: AbstractControl } {
    return this.formEquipe.controls;
  }
  loadForm() {
    this.formEquipe = this.formBuilder.group({

      team_name: [this.equipe.team_name, Validators.required],
      team_image: [this.equipe.team_image, Validators.required],
      leader_id: [this.equipe.leader_id, Validators.required],
    });

  }
  successNotification() {
    Swal.fire("", 'Supprimé avec succés!', 'success');

  }
  onReset() {
    this.isFormSubmitted = false;
    this.formEquipe.reset();
    this.router.navigate(['/admin/equipes'])

  }
  getById(id: any) {
    this.teamsService.getTeamsById(id).subscribe((response: any) => {
      if (response) {
        this.equipe = response[0];
        this.loadForm()
      }
    },
      error => {
        console.log(error)
      });
  }
  getEquipes() {

    this.teamsService.getTeams().subscribe((data) => this.listEquipe = data)

  }
  getUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.listUser = data
      console.log(data)
    })

  }
  onSubmit(imageInput: any) {
    this.isFormSubmitted = true
    if (this.formEquipe.invalid) {
      return;
    }


    this.loading = true;
    this.equipe.leader_id = this.authService.user.userId;
    this.equipe.team_name = this.formEquipe.value.team_name
    const file: File = imageInput.files[0];
    if (file == null) {
      this.loading = false;
      return alert('Veuillez selectionner une image ! ...');

    }
    if (file != null) {
      const reader = new FileReader();
      reader.addEventListener('load', async (event: any) => {
        this.selectedFile = new ImageSnipet(event.target.result, file);
        (await this.imageUploadService.uploadFile(this.selectedFile.file)).subscribe(res => {
          this.equipe.team_image = res.secure_url;
          this.teamsService.addTeam(this.equipe).subscribe(data => { this.router.navigate(['/admin/equipes']) });
          this.loading = false;
          this.onReset()
          this.getEquipes()
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
        this.teamsService.deleteTeam(id).subscribe(
          (response: any) => {
            this.successNotification()
          },
          error => {
            this.ngServiceLoadere.stop();
          },
          () => {
            this.ngServiceLoadere.stop();
            this.getEquipes();
          }

        );
      }
    });
  }

  updateEquipe(imageInput: any) {
    this.isFormSubmitted = true
    if (this.formEquipe.invalid) {
      return;
    }
    this.loading = true;
    const file: File = imageInput.files[0];
    if (file == null) {
      this.loading = false;
      return alert('Veuillez selectionner une image ! ...');

    }
    if (file != null) {
      const reader = new FileReader();
      reader.addEventListener('load', async (event: any) => {
        this.selectedFile = new ImageSnipet(event.target.result, file);
        (await this.imageUploadService.uploadFile(this.selectedFile.file)).subscribe(res => {
          this.formEquipe.value.team_image = res.url;
          this.teamsService.updateTeam(this.id, this.formEquipe.value).subscribe(data => { this.router.navigate(['/admin/equipes']) });
          this.loading = false;
          this.onReset()
          this.getEquipes()
        })
      });
      reader.readAsDataURL(file);
    }

  }

}
