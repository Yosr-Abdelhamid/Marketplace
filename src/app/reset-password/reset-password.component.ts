import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, fromEvent, Observable, Subscription } from 'rxjs';
import { MustMatch } from 'src/must-match.validator';
import { AlertService } from '../alert/alert.service';
import { LoginVendeurService } from '../login-vendeur.service';
import { PasswordReset } from '../models/PasswordReset';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
 
  form: FormGroup | any;
  loading = false;
  submitted = false;
  urlParams: any = {};
  model : any ;
  resizeObservable$: Observable<Event> | any;
  resizeSubscription$: Subscription | any;

  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: LoginVendeurService,
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
                this.router.navigate(['../login']);
                }, 5000);
          },
          error: error => {
              this.alertService.error(error);
              this.loading = false;
          }
      });
}
  }


