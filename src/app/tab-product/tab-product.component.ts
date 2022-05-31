import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatTable } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
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


@Component({
  selector: 'app-tab-product',
  templateUrl: './tab-product.component.html',
  styleUrls: ['./tab-product.component.css']
})

export class TabProductComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  userDetails;
  listProduits =[];
  id:string ;

  @ViewChild(MatTable) table: MatTable<PeriodicElement> | undefined;

  constructor(private router: Router, private http: HttpClient ,  public _location: Location,
    private userService :LoginVendeurService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      res => {
        this.userDetails = res;
        this.id =  this.userDetails.id ;
        this.userService.getAllProducts(this.userDetails.id)
        .subscribe((response) => { this.listProduits = response;}) ;
      }
    );
    //this.getAllProducts();
  }
  
  addData(){
    this.router.navigate(['dashboard-vendeur/add-product']);

  }

  removeP(item){
    if(confirm('Are you sure to delete this Product?')){
      this.userService.deleteProduit(item.id_prod).subscribe(data=>{
        alert(data.toString());
        this.router.navigateByUrl("/dashboard-vendeur", { skipLocationChange: true }).then(() => {
          console.log(decodeURI(this._location.path()));
          this.router.navigate([decodeURI(this._location.path())]);
          });
      })
    }
  }

  edit(item){
    this.router.navigate(['dashboard-vendeur/edit-product'], {
      queryParams:{item:btoa(JSON.stringify(item))}
    });

  }
    


  onLogout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/accueil']);
  }

}

