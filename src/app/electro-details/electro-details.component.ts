import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../clients/services/cart.service';
import { WhishlistService } from '../clients/services/whishlist.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-electro-details',
  templateUrl: './electro-details.component.html',
  styleUrls: ['./electro-details.component.css']
})
export class ElectroDetailsComponent implements OnInit {

  produit:any ;
  i :number ;
  @Input() splitted:any;
  constructor(private route:ActivatedRoute, private whishlistService : WhishlistService ,
    private cartService: CartService , private notifyService:NotificationService)
   { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=> {
      this.produit = JSON.parse(decodeURIComponent(escape(atob(params['produit'])))) ;
      this.splitted = this.produit.description_prod.split('-');
  });
  
}
addToWhishlist(produit){
  this.whishlistService.addToCart(produit);
  this.showToasterSuccess() ;
}
addToCart(produit) {
  this.cartService.addToCart(produit);
  this.showToasterSuccess() ;
}
showToasterSuccess() {
  this.notifyService.showSuccess(
    'Product Added !!' );
}

}
