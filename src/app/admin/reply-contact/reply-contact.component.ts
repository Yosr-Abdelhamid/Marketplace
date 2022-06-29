import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminClientService } from 'src/app/clients/admin-client.service';
import { AlertService } from 'src/app/alert/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactRequest } from 'src/app/models/ContactRequest';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-reply-contact',
  templateUrl: './reply-contact.component.html',
  styleUrls: ['./reply-contact.component.css']
})
export class ReplyContactComponent implements OnInit {
  userDetails ;

  contactForm : any ;
  contact : any ; 

  constructor(private service: AdminClientService, 
    @Inject(MAT_DIALOG_DATA) public data :any , private dialogRef : MatDialogRef<ReplyContactComponent> ,
    private router : Router , private alertService : AlertService) { }

  ngOnInit(): void {
    this.service.getAdmin().subscribe(
      res => {
        this.userDetails = res;
      }
    );
      this.contact = this.data ;

      this.contactForm = new FormGroup({
        email: new FormControl(this.contact.email) ,
        sujet:new FormControl(this.contact.subject),
        message:new FormControl(),
    }) 
  }
  onLogout() {
    localStorage.removeItem('userInf');
    this.router.navigate(['/accueil']);
  }

submit(){
  const newContact = this.contactForm.value;
  this.reply(newContact);
}
reply(request: ContactRequest) {
  this.service.SendEmail(request).subscribe(result => {
    this.alertService.success('Email sent with success !');
  });  
}
 

}
