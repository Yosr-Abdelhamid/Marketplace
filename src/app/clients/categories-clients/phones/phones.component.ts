import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginVendeurService } from 'src/app/login-vendeur.service';
import { NotificationService } from 'src/app/notification.service';
import { CartService } from '../../services/cart.service';
import { WhishlistService } from '../../services/whishlist.service';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.css']
})
export class PhonesComponent implements OnInit {
  sous_famille_prod = 'Smartphone' ;
  p:any;
  data:any=[];
       
  
    constructor(private service : LoginVendeurService, private router :Router ,
      private whishlistService:WhishlistService,
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
    addToWhishlist(item){
      this.whishlistService.addToCart(item)
  }

    addToCart(item) {
      this.cartService.addToCart(item);
      this.showToasterSuccess() ;
    }
    showToasterSuccess() {
      this.notifyService.showSuccess(
        'Product Added !!' );
    }
  }
