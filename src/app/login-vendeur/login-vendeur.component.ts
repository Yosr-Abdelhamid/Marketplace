import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { AuthenticatedResponse, LoginVendeurService } from '../login-vendeur.service';
import { Vendeur } from '../models/Vendeur';
import { RegisterVendeurComponent } from '../register-vendeur/register-vendeur.component';
import { RegisterComponent } from '../register/register.component';
import { TokenStorageServiceService } from '../token-storage-service.service';
import { ToastrService } from 'ngx-toastr';

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
  invalidLogin = false;
  hide: any;
  returnUrl: string | any;
  error = '';
  loading = false;
  public showPassword: boolean | any;


  constructor(public dialog: MatDialog , private tokenStorage: TokenStorageServiceService,
    private formbulider: FormBuilder, private router :Router , private route: ActivatedRoute,
    private loginService: LoginVendeurService, private toastr: ToastrService) {
      
      
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]),
      motDePasse: new FormControl('', [Validators.required])
     
    });
}

   gotoregister(){
    /*const dialogRef = this.dialog.open(RegisterVendeurComponent, {
      id: 'dialog2'
    });
    console.log(dialogRef);
  } */
  this.dialog.closeAll() ;
  this.router.navigate(['/register-vendeur']) ;
}
  openDialogue(){
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      id: 'dialog3'
    });
    console.log(dialogRef);
  }

  ngOnInit() {
 
}
onSubmit(){ 
  this.loading = true;   
  this.loginService.Login(this.model).subscribe((data:any) => {  
          localStorage.setItem("userInfo" , JSON.stringify(data.dateSet)) ;
          let vendeur = data.dateSet as Vendeur;
          this.dialog.closeAll();
          this.loading = false;
          this.router.navigate(["/dashboard-vendeur"]);
        
   },
    err => {
    if (err.status == 400)
      this.toastr.error('Incorrect username or password.', 'Authentication failed.');
    else
      console.log(err);
  })      
      /* error: _error => {
          this.alertService.error("Check you email and password please !");
         
      } */
  
}    

}






/* onSubmit(){    
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
      if (this.isSignUpFailed = true ){
      this.alertService.error('Check your email and password please !');}  
    });    
}  */