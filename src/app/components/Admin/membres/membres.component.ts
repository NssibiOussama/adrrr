import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../../models/user.model'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css', '../../../../assets/integration/assets/vendor/css/core.css', '../../../../assets/integration/assets/vendor/css/theme-default.css', '../../../../assets/integration/assets/css/demo.css', '../../../../assets/integration/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css'],
})
export class MembresComponent implements OnInit {
  formUsers: FormGroup = new FormGroup({
    type: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  isFormSubmitted = false;
  id: any;
  users: any[];
  user: any;
  //
  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ngServiceLoadere: NgxUiLoaderService,) { }

  ngOnInit(): void {
    this.loadForm()
    this.getUsers()
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.id = params.get('id');
        this.getUserById(params.get('id'));
      }
    });
  }
  get UserControls(): { [key: string]: AbstractControl } {
    return this.formUsers.controls;
  }
  loadForm() {
    this.formUsers = this.formBuilder.group({
      first_name: [this.user?.last_name, Validators.required],
      last_name: [this.user?.first_name, Validators.required],
      role: [this.user?.role, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]]

    });

  }
  getUserById(id: any) {
    this.userService.getUser(id).subscribe((response: any) => {
      if (response) {
        this.user = response[0]
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
  getUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    })

  }
  onReset() {
    this.isFormSubmitted = false;
    this.formUsers.reset();

  }

  deleteUser(id: number) {
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
        this.userService.deleteUser(id).subscribe(
          (response: any) => {
            console.log(response)
            this.successNotification()
          },
          error => {
            this.ngServiceLoadere.stop();
          },
          () => {
            this.ngServiceLoadere.stop();
            this.getUsers();
          }

        );
      }
    });

  }
  onSubmit() {

  }
  updateUser() {
    this.isFormSubmitted = true
    if (this.formUsers.invalid) {
      return;
    }
    this.userService.updateUser(this.id, this.formUsers.value).subscribe((data) => this.router.navigateByUrl('/admin/membres')
    )
  }

}
