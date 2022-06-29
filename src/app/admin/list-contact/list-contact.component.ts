import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminClientService } from 'src/app/clients/admin-client.service';
import { ReplyContactComponent } from '../reply-contact/reply-contact.component';


@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {

  userDetails ;
  messagesList:any[] ;
  panelOpenState = false;
  
  
    constructor(private service: AdminClientService, private router : Router, private dialog: MatDialog) { }
  
    ngOnInit(): void {
      this.service.getAdmin().subscribe(
        res => {
          this.userDetails = res;
        }
      );
      this.service.GetContact().subscribe((response) => { 
           
        this.messagesList = response ;}
      )
    }
    onLogout() {
      localStorage.removeItem('userInf');
      this.router.navigate(['/accueil']);
    }


    reply(contact){
    this.dialog.open(ReplyContactComponent,{
      data : contact 
    }); 
    }

    remove(contact){
      if(confirm('Are you sure to delete this Message?')){
        this.service.deleteContact(contact.id).subscribe(data=>{
          //alert(data.toString());
          this.ngOnInit() ;
        })
      }
    }
}
