import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../alert/alert.service';
import { AdminClientService } from '../clients/admin-client.service';
import { Contact } from '../models/Contact';
import { first } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

 
  contactForm: any;

  constructor(private service : AdminClientService , private alertService : AlertService) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]),
      Name: new FormControl('', [Validators.required]),
      Subject:new FormControl('', [Validators.required]),
      Message:new FormControl('', [Validators.required]),
  }) 
}
  submit(){
    const newContact = this.contactForm.value;
    this.createContact(newContact);
  }
  createContact(contact:Contact){
      this.service.AddContact(contact).pipe(first())
      .subscribe({
      next: () => {
          this.alertService.success('Your message is sent with success ! Thanks for contacting');
          this.contactForm.reset()
          //this.closeDialog();
      },
      error: error => {
        if (error.status == 400) {
          this.alertService.error("Email in use ! Check your informations please !");
        }
      }
    });
  }

}
