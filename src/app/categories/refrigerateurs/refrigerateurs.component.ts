import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginVendeurService } from 'src/app/login-vendeur.service';
import { WhishlistService } from 'src/app/clients/services/whishlist.service';
import { AdminClientService } from 'src/app/clients/admin-client.service';

@Component({
  selector: 'app-refrigerateurs',
  templateUrl: './refrigerateurs.component.html',
  styleUrls: ['./refrigerateurs.component.css']
})
export class RefrigerateursComponent implements OnInit {

  sous_famille = 'Refrigérateur' ;
  p:any;
  data:any=[];
       
  
    constructor(private service : AdminClientService,private router :Router ,private whishlistService : WhishlistService) { }
  
    ngOnInit(): void {
  
    this.service.getProductByCategory(this.sous_famille).subscribe(
      res => {
        this.data = res;
      }
    )
    //this.getData({ pageIndex: this.page, pageSize: this.size });
  
    }
    routProd(item){
      this.router.navigate(['accueil/product-details'], {
        queryParams:{item:btoa(JSON.stringify(item))}
      });
      
  
    }
    addToWhishlist(item){
      this.whishlistService.addToCart(item)
  }
  }
  
  
