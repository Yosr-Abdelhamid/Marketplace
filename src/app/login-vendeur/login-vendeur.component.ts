import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginVendeurService } from '../login-vendeur.service';
import { RegisterVendeurComponent } from '../register-vendeur/register-vendeur.component';
import { RegisterComponent } from '../register/register.component';
import { TokenStorageServiceService } from '../token-storage-service.service';

@Component({
  selector: 'app-login-vendeur',
  templateUrl: './login-vendeur.component.html',
  styleUrls: ['./login-vendeur.component.css']
})
export class LoginVendeurComponent implements OnInit {

  submitted = false;
  loginForm: FormGroup | any;
  model : any={}; 
  data = false;   
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  isSuccessful = false;
  isSignUpFailed = false;
  hide: any;
  public showPassword: boolean | any;


  constructor(public dialog: MatDialog , private tokenStorage: TokenStorageServiceService,private formbulider: FormBuilder, private router :Router ,private loginService: LoginVendeurService) { 
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]),
      motDePasse: new FormControl('', [Validators.required])
     
    });
  }

  openDialog(){
    const dialogRef = this.dialog.open(RegisterVendeurComponent, {
      id: 'dialog2'
    });
    console.log(dialogRef);
  }
  openDialogue(){
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      id: 'dialog3'
    });
    console.log(dialogRef);
  }

  ngOnInit() {
    this.isLoginFailed=false ;
 
}
onSubmit(){    
  this.loginService.Login(this.model).subscribe(    
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.dialog.closeAll();
        this.router.navigate(['/page-vendeur']);
      },
    error => {    
      this.errorMessage = error.message;
      this.isLoginFailed = true;    
    });    
};    

}
