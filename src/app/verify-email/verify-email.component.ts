import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../alert/alert.service';
import { LoginVendeurService } from '../login-vendeur.service';
import { ProgressbarService } from '../progressbar.service';

enum EmailStatus {
    Verifying,
    Failed
}

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  EmailStatus = EmailStatus;
  emailStatus = EmailStatus.Verifying;
  loading = false;
  emailConfirmed: boolean = false;
  urlParams: any = {};
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private accountService: LoginVendeurService,
      private alertService: AlertService,
      public progressBar: ProgressbarService,
  ) { }

  ngOnInit() {
      this.urlParams.token = this.route.snapshot.queryParamMap.get('token');
      this.loading = true;
      this.confirmEmail();
  }
    confirmEmail() {
      this.accountService.verifyEmail(this.urlParams).subscribe(
        () => {
          //this.progressBar.setSuccess();
          console.log('success');
          this.alertService.success('Email Confirmed');
          this.loading = false;
          this.emailConfirmed = true;
        },
        (error) => {
          //this.progressBar.setFailure();
          console.log(error);
          this.alertService.error('Unable to confirm email')
          this.loading = false;
          this.emailConfirmed = false;
        }
      );
    }

      // remove token from url to prevent http referer leakage
      /* this.router.navigate([], { relativeTo: this.route, replaceUrl: true });
      this.loading = true;   
      this.accountService.verifyEmail(token)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('Verification successful, you can now login', { keepAfterRouteChange: true });
                  setTimeout(() => {
                    this.router.navigate(['/login'], { relativeTo: this.route });
                    this.loading = false;
                    }, 15000);
                 
              },
              error: () => {
                  this.emailStatus = EmailStatus.Failed;
              }
          });
  } */

}
