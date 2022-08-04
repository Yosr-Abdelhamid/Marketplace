import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginVendeurService } from '../login-vendeur.service';
import { Register } from '../register';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from '../alert/alert.service';
import { first, timeout } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-register-vendeur',
  templateUrl: './register-vendeur.component.html',
  styleUrls: ['./register-vendeur.component.css']
})
export class RegisterVendeurComponent implements OnInit {

  submitted = false;
  registerForm: any;
  BillingForm:any;
  data = false;
  massage!: string;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  modalVisible = false;
  isEditable = false;
  @ViewChild('stepper') private myStepper: MatStepper;

  constructor(private formbulider: FormBuilder, 
     private router :Router ,  private alertService: AlertService , private route: ActivatedRoute,
     private loginService: LoginVendeurService) { } 

  ngOnInit() {
   /*  this.registerForm = new FormGroup({
      name: new FormControl(this.registerForm.Nom, [
        Validators.required])}) */
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
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
          )])
        });

        this.BillingForm =  new FormGroup({
          numberCard:new FormControl('', [Validators.required]),
          Exprdate:new FormControl('', [Validators.required]),
          CartName:new FormControl('', [Validators.required]),
          checkTerme:new FormControl('', [Validators.required])
        })
 
}
onSubmit(){
  var register = <Register>{} ;
  register.Nom = this.registerForm.value.Nom,
  register.Prenom =this.registerForm.value.Prenom,
  register.Email =this.registerForm.value.email,
  register.Adresse=this.registerForm.value.Adresse ,
  register.Num_Telephone =this.registerForm.value.Num_Telephone,
  register.ZipCode=this.registerForm.value.ZipCode,
  register.Organization=this.registerForm.value.Organization,
  register.CartNumber=this.BillingForm.value.numberCard,
  register.expireDate=this.BillingForm.value.Exprdate,
  register.CartName=this.BillingForm.value.CartName,
  register.MotDePasse=this.registerForm.value.MotDePasse,

  console.log(this.BillingForm.value.Exprdate);
  console.log(this.BillingForm.value.CartName);

 this.loginService.Signup(register).pipe(first())
    .subscribe({
    next: () => {
        /* this.alertService.success('Registration successful, please check your email for verification instructions');
        setTimeout(() => {
          this.router.navigate(['/login']);
          }, 4000);
        //this.closeDialog();
        this.myStepper.next();*/
    }, 
    error: error => {
      if (error.status == 400) {
        this.alertService.error("Email in use ! Check your informations please !");
      }
    }
}) 
}
}
  
 




/* onSubmit(){
  const user = this.registerForm.value;
    this.createUser(user);
}

createUser(register: Register) {
  this.loginService.Signup(register).pipe(first())
    .subscribe({
    next: () => {
        /* this.alertService.success('Registration successful, please check your email for verification instructions');
        setTimeout(() => {
          this.router.navigate(['/login']);
          }, 4000);
        //this.closeDialog();
        this.myStepper.next();
    }, 
    error: error => {
      if (error.status == 400) {
        this.alertService.error("Email in use ! Check your informations please !");
      }
    }
});
} */