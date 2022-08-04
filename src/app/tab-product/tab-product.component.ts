import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { first } from 'rxjs';
import { LoginVendeurService } from '../login-vendeur.service';
import { User } from '../models/User';
import { Vendeur } from '../models/Vendeur';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tab-product',
  templateUrl: './tab-product.component.html',
  styleUrls: ['./tab-product.component.css']
})

export class TabProductComponent implements OnInit {
  displayedColumns = ['rowIndex','reference','prix_prod','quantity' ,'image_prod','actions'];
  dataSource!:MatTableDataSource<any>;
  rowIndex =1 ;
  userDetails;
  listProduits =[];
  id:string ;
  solde ;

  @ViewChild('paginator') paginator! : MatPaginator ;
  @ViewChild(MatSort) matSort! : MatSort;

  constructor(private router: Router, private http: HttpClient ,  public _location: Location,
    private userService :LoginVendeurService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      res => {
        this.userDetails = res;
        this.id =  this.userDetails.id ;
        this.userService.GetPortfeuille(this.userDetails.id).subscribe(
          res => {
            this.solde = res ;
          }
        );
        this.userService.getAllProducts(this.userDetails.id)
        .subscribe((response) => { 
         
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
          this.listProduits = response;
          
    
    },
    );  })
    //this.getAllProducts();
  }
  
  addData(){
    this.router.navigate(['dashboard-vendeur/add-product']);

  }

  removeP(item){
    if(confirm('Are you sure to delete this Product?')){
      this.userService.deleteProduit(item.id_prod).subscribe(data=>{
        //alert(data.toString());
        this.ngOnInit() ;
      })
    }
  }

  edit(item){
    this.router.navigate(['dashboard-vendeur/edit-product'], {
      queryParams:{item:btoa(unescape(encodeURIComponent(JSON.stringify(item))))}
    });

  }
    
  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }

  onLogout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/accueil']);
  }

}

