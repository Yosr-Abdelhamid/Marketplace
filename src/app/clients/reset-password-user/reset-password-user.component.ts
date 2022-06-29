import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alert/alert.service';
import { LoginVendeurService } from 'src/app/login-vendeur.service';
import { PasswordReset } from 'src/app/models/PasswordReset';
import { MustMatch } from 'src/must-match.validator';
import { first} from 'rxjs';
import { AdminClientService } from '../admin-client.service';

@Component({
  selector: 'app-reset-password-user',
  templateUrl: './reset-password-user.component.html',
  styleUrls: ['./reset-password-user.component.css']
})
export class ResetPasswordUserComponent implements OnInit {

  form: FormGroup | any;
  loading = false;
  submitted = false;
  urlParams: any = {};
  model : any ;


  constructor( private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute,
    private accountService: AdminClientService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });

  this.urlParams.token = this.route.snapshot.queryParamMap.get('token');
  console.log(this.urlParams.token)
  // remove token from url to prevent http referer leakage
  //this.router.navigate([], { relativeTo: this.route, replaceUrl: true });
  
  }
// convenience getter for easy access to form fields
get f() { return this.form.controls; }

onSubmit() {
  this.submitted = true;

  // reset alerts on submit
  this.alertService.clear();

  // stop here if form is invalid
  if (this.form.invalid) {
      return;
  }

  this.loading = true;
  let request = new PasswordReset(this.urlParams.token ,this.f.password.value, this.f.confirmPassword.value ) ;
  this.accountService.resetPassword(request)
      .pipe(first())
      .subscribe({
          next: () => {
              this.alertService.success('Password reset successful, you can now login');
              setTimeout(() => {
                this.router.navigate(['../login-user']);
                }, 5000);
          },
          error: error => {
              this.alertService.error(error);
              this.loading = false;
          }
      });
}
  }





