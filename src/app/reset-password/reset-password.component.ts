import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, fromEvent, Observable, Subscription } from 'rxjs';
import { MustMatch } from 'src/must-match.validator';
import { AlertService } from '../alert/alert.service';
import { LoginVendeurService } from '../login-vendeur.service';

enum TokenStatus {
  Validating,
  Valid,
  Invalid
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  TokenStatus = TokenStatus;
  tokenStatus = TokenStatus.Validating;
  token = '';
  form: FormGroup | any;
  loading = false;
  submitted = false;
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

  const token = this.route.snapshot.queryParams['token'];

  // remove token from url to prevent http referer leakage
  this.router.navigate([], { relativeTo: this.route, replaceUrl: true });
  
  this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( (evt: any) => {
      console.log('event: ', evt)
 }) }
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
  this.accountService.resetPassword(this.token, this.f.password.value, this.f.confirmPassword.value)
      .pipe(first())
      .subscribe({
          next: () => {
              this.alertService.success('Password reset successful, you can now login', { keepAfterRouteChange: true });
              this.router.navigate(['../login'], { relativeTo: this.route });
          },
          error: error => {
              this.alertService.error(error);
              this.loading = false;
          }
      });
}
  }


