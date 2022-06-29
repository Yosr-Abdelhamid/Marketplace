import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminClientService } from 'src/app/clients/admin-client.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {
userDetails ;
displayedColumns = ['rowIndex','nom','prenom','email' ,'adresse','num_Telephone' ,'zipCode'];
dataSource!:MatTableDataSource<any>;
rowIndex =1 ;

  constructor(private service: AdminClientService, private router : Router) { }

  ngOnInit(): void {
    this.service.getAdmin().subscribe(
      res => {
        this.userDetails = res;
      }
    );
    this.service.getAllClients().subscribe((response) => { 
         
      this.dataSource = new MatTableDataSource(response);}
    )
  }
  onLogout() {
    localStorage.removeItem('userInf');
    this.router.navigate(['/accueil']);
  }
}
