import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginVendeurService } from '../login-vendeur.service';
import { Register } from '../register';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from '../alert/alert.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-register-vendeur',
  templateUrl: './register-vendeur.component.html',
  styleUrls: ['./register-vendeur.component.css']
})
export class RegisterVendeurComponent implements OnInit {

  submitted = false;
  registerForm: any;
  data = false;
  massage!: string;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  modalVisible = false;

  constructor(private formbulider: FormBuilder, 
     private router :Router ,  private alertService: AlertService ,
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
          MotDePasse: new FormControl('', [Validators.required,Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
          )])
        });
     /*  this.registerForm = this.formbulider.group({    
      Nom: ['', [Validators.required]],    
      Prenom: ['', [Validators.required]],    
      Email: ['', [Validators.required,Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$' ),]],    
      Adresse: ['', [Validators.required]],    
      Num_Telephone: ['', [Validators.required]],    
      MotDePasse: ['', [Validators.required]],    
    }); */
 
}
onSubmit(){
  const user = this.registerForm.value;
    this.createUser(user);
}

createUser(register: Register) {
  this.loginService.Signup(register)
    .subscribe({
    next: () => {
        this.alertService.success('Success Registration !');
        this.router.navigate(['/login']);
        //this.closeDialog();
    },
    error: error => {
        this.alertService.error("Check your informations please !");
    }
});
}

  /* closeDialog(){
   
    setTimeout(() => {this.dialog.close();}, 3000)
  } */

}

  
 

