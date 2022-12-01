import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from 'src/app/services/resetPasswordService/reset-password.service';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';








@Component({
  selector: 'app-send-reset-code',
  templateUrl: './send-reset-code.component.html',
  styleUrls: ['./send-reset-code.component.css']
})
export class SendResetCodeComponent implements OnInit {
  email:string
  formReset: FormGroup = new FormGroup({
    email: new FormControl(''),
    acceptTerms: new FormControl(false),
  });


  isFormSubmitted = false;
  constructor(private formBuilder: FormBuilder,private resetPasswordService:ResetPasswordService,private ngServiceLoadere: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.loadForm()
  }
  get ResetControls(): { [key: string]: AbstractControl } {
    return this.formReset.controls;
  }
  successNotification() {
    Swal.fire("", 'Veuillez consulter votre boite mail', 'success');
  }
  loadForm() {
    this.formReset = this.formBuilder.group({
      email: [this.email, [Validators.required,Validators.email]],
    
    });

  }

  onSubmit() {
    this.isFormSubmitted = true
    if (this.formReset.invalid) {
      return;
    }

    this.resetPasswordService.resetCode(this.formReset.value).subscribe(
      (data: any) => {  
        this.formReset.reset()
        this.successNotification() 
      },(error) => {
        console.log(error);
        
        Swal.fire("", error.error.msg, 'error');
        
        // this.ngServiceLoadere.stop()
       });

    }


}
