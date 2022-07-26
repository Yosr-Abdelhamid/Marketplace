import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WhishlistService } from 'src/app/clients/services/whishlist.service';
import { CartService } from '../clients/services/cart.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  item:any ;
   @Input() splitted:any;
  constructor(private route:ActivatedRoute ,private whishlistService : WhishlistService,
    private cartService: CartService , private notifyService:NotificationService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=> {
      this.item = JSON.parse(decodeURIComponent(escape(atob(params['item'])))) ;
      this.splitted = this.item.description_prod.split('-');
  });
}

addToWhishlist(produit){
  this.whishlistService.addToCart(produit);
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
  
}
