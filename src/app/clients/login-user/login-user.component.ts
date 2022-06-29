import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AlertService } from 'src/app/alert/alert.service';
import { Acheteur } from 'src/app/models/Acheteur';
import { AdminClientService } from '../admin-client.service';
import { Client } from '../Client';
import { ForgotPasswordUserComponent } from '../forgot-password-user/forgot-password-user.component';


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  registerForm: any;
  loginForm:  any;
  hide: any;
  returnUrl: string | any;
  public showPassword: boolean | any;
  model : any={}; 
  loading = false ;
  constructor(private service: AdminClientService , private alertService : AlertService , private dialog: MatDialog , private router : Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]),
      motDePasse: new FormControl('', [Validators.required])
     
    });
   }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]),
      Nom: new FormControl('', [Validators.required]),
      Prenom:new FormControl('', [Validators.required]),
      Adresse:new FormControl('', [Validators.required]),
      Num_Telephone:new FormControl('', [Validators.required]),
      ZipCode:new FormControl('', [Validators.required]),
      Organization:new FormControl('', [Validators.required]),
      MotDePasse: new FormControl('', [Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$' )])
  }) ;
  }

  register() {
    const user = this.registerForm.value;
    this.createUser(user);
}

createUser(client: Client) {
  this.service.Signup(client).pipe(first())
    .subscribe({
    next: () => {
        this.alertService.success( 'Registration successful, please check your email for verification instructions');
        this.registerForm.reset();
    },
    error: error => {
      if (error.status == 400) {
        this.alertService.error("Email in use ! Check your informations please !");
      }
    }
});
  }

  Loginn(){
  this.loading = true;   
  this.service.Login(this.model).subscribe(
      (data:any) => {  
          localStorage.setItem("userInf" , JSON.stringify(data.dateSet)) ;
          let userInfo = JSON.parse(localStorage.getItem("userInf")) ;
          let user = data.dateSet as Acheteur;
          this.loading = false;
          console.log(userInfo.role) ;
          if (userInfo.role === "isClient") {
            this.router.navigate(['/compte-client']);
          } 
          else if(userInfo.role === "isAdmin") {
            this.router.navigate(['/dashboard-admin']) ;
          }
      },
      err => {
      this.loading = false;
      if (err.status == 400)
        this.alertService.error('Incorrect username or password.', 'Authentication failed.');
      else
        console.log(err);
      })      
}
onSubmit(){
}


openDialog(){
  this.dialog.open(ForgotPasswordUserComponent); 
}
}
