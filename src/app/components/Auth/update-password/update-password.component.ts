import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from 'src/app/services/resetPasswordService/reset-password.service';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmedValidator } from './confirmed.validator';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  code : any
  formPassword: FormGroup = new FormGroup({
    email: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });

  isFormSubmitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private resetPasswordService:ResetPasswordService,
    private ngServiceLoadere: NgxUiLoaderService,
    private router: Router,
    private ac: ActivatedRoute,
    ) { }

  ngOnInit(): void {
     this.loadForm()
    this.code = this.ac.snapshot.params['code']
    console.log(this.code);
    

  }
  get passworsControls() {
    return this.formPassword.controls;
  }
  successNotification() {
    Swal.fire("", 'Mazelt Makemletch', 'error');
  }
  loadForm() {
    this.formPassword = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    
    }, { 
      validator: ConfirmedValidator('password', 'confirmPassword')
    });

  }

  onSubmit(){
    this.isFormSubmitted = true
    if (this.formPassword.invalid) {
      return;
    }
    // console.log(this.ac.snapshot.params['code']);
    this.successNotification()
    

  }

}
