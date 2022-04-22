import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginForm: FormGroup | any;

  constructor(public dialog: MatDialog , private router :Router) { 
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]),
      password: new FormControl('', [Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )])
    });
  }

  openDialog(){
    const dialogRef = this.dialog.open(RegisterComponent, {
      id: 'dialog2'
    });
    console.log(dialogRef);
  }

  ngOnInit() {
 
}
onSubmit(){
  if(!this.loginForm.valid){
    return;
  }
  localStorage.setItem('user',this.loginForm.value)
  this.router.navigate(['/home'])
}
  
}