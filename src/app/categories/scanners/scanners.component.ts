import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginVendeurService } from 'src/app/login-vendeur.service';
import { WhishlistService } from 'src/app/clients/services/whishlist.service';
import { AdminClientService } from 'src/app/clients/admin-client.service';
import { CartService } from 'src/app/clients/services/cart.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-scanners',
  templateUrl: './scanners.component.html',
  styleUrls: ['./scanners.component.css']
})
export class ScannersComponent implements OnInit {
  sous_famille = 'Scanner' ;
  p:any;
  data:any=[];
  public filterCategory : any
       
  
    constructor(private service : AdminClientService,private router :Router 
      , private cartService:CartService,
      private whishlistService : WhishlistService , private notifyService:NotificationService) { }
  
    ngOnInit(): void {
  
    this.service.getProductByCategory(this.sous_famille).subscribe(
      res => {
        this.data = res;
        this.filterCategory = res;

      }
    )
    //this.getData({ pageIndex: this.page, pageSize: this.size });
  
    }
    routProd(item){
      this.router.navigate(['accueil/product-details'], {
        queryParams:{item:btoa(unescape(encodeURIComponent(JSON.stringify(item))))}
      });
      
  
    }
    addToWhishlist(item){
      this.whishlistService.addToCart(item);
      this.showToasterSuccess() ;
  }


  addToCart(item) {
    this.cartService.addToCart(item);
    this.showToasterSuccess() ;
  }
  showToasterSuccess() {
    this.notifyService.showSuccess(
      'Product Added !!' );
  }

  
   filter(brand:string){
    this.filterCategory = this.data
    .filter((a:any)=>{
      console.log(a.brand)
      if(a.brand == brand || brand==''){
        return a;
      }
    })
  }
  search(min:string , max:string){
    this.filterCategory = this.data
    .filter((a:any)=>{
      if((a.prix_prod > min) && (a.prix_prod < max)){
        return a;
      }
    })
  }
  }
  
  
