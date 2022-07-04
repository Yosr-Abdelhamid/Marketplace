import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WhishlistService } from 'src/app/clients/services/whishlist.service';
import { LoginVendeurService } from 'src/app/login-vendeur.service';

@Component({
  selector: 'app-pc-portables',
  templateUrl: './pc-portables.component.html',
  styleUrls: ['./pc-portables.component.css']
})
export class PcPortablesComponent implements OnInit {

  sous_famille_prod = 'PC Portable' ;
  p:any;
  data:any=[];
       
  
    constructor(private service : LoginVendeurService,private router :Router , private whishlistService : WhishlistService ,) { }
  
    ngOnInit(): void {
  
    this.service.GetProductsByCategory(this.sous_famille_prod).subscribe(
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
