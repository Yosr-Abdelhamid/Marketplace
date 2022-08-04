import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminClientService } from 'src/app/clients/admin-client.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {
userDetails ;
displayedColumns = ['rowIndex','nom','prenom','email' ,'adresse','num_Telephone' ,'zipCode' ,'actions'];
dataSource!:MatTableDataSource<any>;
rowIndex =1 ;
listClients;
  constructor(private service: AdminClientService, private router : Router ,private notifyService : NotificationService,) { }

  ngOnInit(): void {
    this.service.getAdmin().subscribe(
      res => {
        this.userDetails = res;
      }
    );
    this.service.getAllClients().subscribe((response) => { 
         
      this.dataSource = new MatTableDataSource(response);
      this.listClients = response }
    )
  }
  onLogout() {
    localStorage.removeItem('userInf');
    this.router.navigate(['/accueil']);
  }

  block(item){
    this.service.ActivateClient(item.id).subscribe(res => {
     this.showToasterSuccess() ;
     this.ngOnInit();
     
   })
   
   }
   
   
   showToasterSuccess() {
     this.notifyService.showSuccess(
       'This Account is Blocked !!' );
       }
}
