import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router' ;
import { MatTableDataSource } from '@angular/material/table';
import { AdminClientService } from 'src/app/clients/admin-client.service';
import { LoginVendeurService } from 'src/app/login-vendeur.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
userDetails ;
displayedColumns = ['rowIndex','nom','prenom','email' ,'adresse','zipCode' , 'organization'];
dataSource!:MatTableDataSource<any>;
rowIndex =1 ;
  constructor(private service: AdminClientService , private userService: LoginVendeurService, private router : Router ) { }

  ngOnInit(): void {

    this.service.getAdmin().subscribe(
      res => {
        this.userDetails = res;
      }
    );
    this.userService.getAll()
        .subscribe((response) => { 
         
          this.dataSource = new MatTableDataSource(response);

  });
}
onLogout() {
  localStorage.removeItem('userInf');
  this.router.navigate(['/accueil']);
}

}
