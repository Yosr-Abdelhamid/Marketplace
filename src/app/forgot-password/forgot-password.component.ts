import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  loading = false ;
  hide: any;
  public loginForm: FormGroup | any;
  
  constructor(public dialogRef: MatDialogRef<"close">,private formBuilder: FormBuilder , private router : Router) { }

  ngOnInit(){
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  //method for error in login
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  // function call on submit login form
  public submitLoginForm () {
    if (this.loginForm.valid) {
      console.log("Form is Validate");
    }
  };

  login() {
    this.dialogRef.close('Pizza!');
  }

}

