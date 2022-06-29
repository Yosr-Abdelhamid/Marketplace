import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize, first } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { LoginVendeurService } from '../login-vendeur.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  loading = false ;
  hide: any;
  model : any={}; 
  public loginForm: FormGroup | any;
  form: FormGroup | any;
  submitted = false;
  
  constructor(public dialogRef: MatDialogRef<ForgotPasswordComponent>,private formBuilder: FormBuilder ,
   private router : Router, private accountService: LoginVendeurService,
   private alertService: AlertService) { }

  ngOnInit(){
    /* this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  } */
 
  this.form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
    });
  }
    get f() { return this.form.controls; }

  //method for error in login
  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };
    onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this.alertService.clear();
      this.accountService.forgotPassword(this.f.email.value)
          .pipe(first())
          .pipe(finalize(() => this.loading = false))
          .subscribe({
              next: () => this.alertService.success('Please check your email for password reset instructions'),
              error: error => this.alertService.error(error)
          });
          setTimeout(() => {this.closeDialog(); },5000) ;
          
  }


  login() {
    this.dialogRef.close('close!');
  }

  closeDialog(){
   
    this.dialogRef.close();
  }
}

