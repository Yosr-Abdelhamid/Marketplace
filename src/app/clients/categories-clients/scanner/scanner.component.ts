import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginVendeurService } from 'src/app/login-vendeur.service';
import { NotificationService } from 'src/app/notification.service';
import { CartService } from '../../services/cart.service';
import { WhishlistService } from '../../services/whishlist.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  sous_famille_prod = 'Scanner' ;
  p:any;
  data:any=[];
       
  
    constructor(private service : LoginVendeurService,private router :Router ,
      private whishlistService : WhishlistService ,
       private notifyService: NotificationService , private cartService: CartService) { }
  
    ngOnInit(): void {
  
    this.service.GetProductsByCategory(this.sous_famille_prod).subscribe(
      res => {
        this.data = res;
      }
    )
    //this.getData({ pageIndex: this.page, pageSize: this.size });
  
    }
    routProd(item){
      this.router.navigate(['compte-client/prod-details'], {
        queryParams:{item:btoa(JSON.stringify(item))}
      });
      
    }
    addToCart(item) {
      this.cartService.addToCart(item);
      this.showToasterSuccess() ;
    }
    addToWhishlist(item){
      this.whishlistService.addToCart(item)
  }
    showToasterSuccess() {
      this.notifyService.showSuccess(
        'Product Added !!' );
    }
}