import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { first } from 'rxjs';
import { LoginVendeurService } from '../login-vendeur.service';
import { User } from '../models/User';
import { Vendeur } from '../models/Vendeur';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Samsung S20', weight: 100.079, symbol: '2'},
  {position: 2, name: 'Samsung S20', weight: 400.266, symbol: '3'},
  {position: 3, name: 'Samsung S20', weight: 600.441, symbol: '5'},
  {position: 4, name: 'Samsung S20', weight: 901.622, symbol: '6'},
  {position: 5, name: 'Boron', weight:  600.441 ,symbol: '8'},
  {position: 6, name: 'Samsung S20', weight:  600.441, symbol: '2'},
  {position: 7, name: 'Nitrogen', weight: 600.441, symbol: '1'},
  {position: 8, name: 'Samsung S20', weight: 600.441, symbol: '3'},
  {position: 9, name: 'Fluorine', weight: 600.441, symbol: '6'},
  {position: 10, name: 'Neon', weight: 2600.441, symbol: '8'},
];

@Component({
  selector: 'app-dashboard-vendeur',
  templateUrl: './dashboard-vendeur.component.html',
  styleUrls: ['./dashboard-vendeur.component.css']
})
export class DashboardVendeurComponent  implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = [...ELEMENT_DATA];
  userDetails;


  @ViewChild(MatTable) table: MatTable<PeriodicElement> | undefined;

  constructor(private router: Router, private http: HttpClient , private userService :LoginVendeurService) { }

  ngOnInit(): void {
    this.getAllUsers() ;
  }
  
 getAllUsers(){
  this.userService.getUser().subscribe(
    res => {
      this.userDetails = res;
    },
    err => {
      console.log(err);
    },
  );
  }
  
  addData(){
    this.router.navigate(['dashboard-vendeur/home']);

  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/accueil']);
  }

}

