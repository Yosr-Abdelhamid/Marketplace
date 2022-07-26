import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router' ;
import { MatTableDataSource } from '@angular/material/table';
import { AdminClientService } from 'src/app/clients/admin-client.service';
import { LoginVendeurService } from 'src/app/login-vendeur.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
userDetails ;
displayedColumns = ['rowIndex','nom','prenom','email' ,'adresse','zipCode' , 'organization', 'actions'];
dataSource!:MatTableDataSource<any>;
rowIndex =1 ;
listVendeurs ;
click : boolean = false;


  constructor(private service: AdminClientService , private userService: LoginVendeurService, private notifyService : NotificationService, 
    private router : Router ) { }

  ngOnInit(): void {

    this.service.getAdmin().subscribe(
      res => {
        this.userDetails = res;
      }
    );
    this.userService.getAll()
        .subscribe((response) => { 
         
          this.dataSource = new MatTableDataSource(response);
          this.listVendeurs = response ;
  });
}
onLogout() {
  localStorage.removeItem('userInf');
  this.router.navigate(['/accueil']);
}

activate(item){
 this.service.ActivateVendeur(item.id).subscribe(res => {
  this.showToasterSuccess() ;
  this.ngOnInit();
  
})

}


showToasterSuccess() {
  this.notifyService.showSuccess(
    'This Account is Activated !!' );
    }

}
