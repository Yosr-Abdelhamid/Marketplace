import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/alert/alert.service';
import { AdminClientService } from '../admin-client.service';


enum EmailStatus {
    Verifying,
    Failed
}
@Component({
  selector: 'app-verify-email-client',
  templateUrl: './verify-email-client.component.html',
  styleUrls: ['./verify-email-client.component.css']
})
export class VerifyEmailClientComponent implements OnInit {

  EmailStatus = EmailStatus;
  emailStatus = EmailStatus.Verifying;
  loading = false;
  emailConfirmed: boolean = false;
  urlParams: any = {};
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AdminClientService,
      private alertService: AlertService,
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
          this.loading = false;
          this.alertService.success('Email Confirmed');
          setTimeout(() => {
            this.router.navigate(['/login-user']);
            }, 5000);
         
        },
        (error) => {
          //this.progressBar.setFailure();
          console.log(error);
          this.loading = false;
          this.alertService.error('Unable to confirm email')
          setTimeout(() => {
            this.router.navigate(['/register-user']);
            }, 5000);
          this.emailConfirmed = false;
        }
      );
    }
}
