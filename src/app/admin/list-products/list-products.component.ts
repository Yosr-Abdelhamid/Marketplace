import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminClientService } from 'src/app/clients/admin-client.service';
import { ProductResult } from 'src/app/models/ProductResult';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  userDetails ;
  displayedColumns = ['rowIndex','organization', 'reference' ,'quantity' ,'prix_prod','image_prod'];

  dataSource!:MatTableDataSource<any>;
  //rowIndex =1 ;
  @ViewChild('paginator') paginator! : MatPaginator ;
  @ViewChild(MatSort) matSort! : MatSort;
  
  
  constructor(private service: AdminClientService, private router : Router) { }

  ngOnInit(): void {
    this.service.getAdmin().subscribe(
      res => {
        this.userDetails = res;
      }
    );
    this.service.getListProducts()
    .subscribe((data) => { 
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;}
    )
  }
  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }

  onLogout() {
    localStorage.removeItem('userInf');
    this.router.navigate(['/accueil']);
  }
}
