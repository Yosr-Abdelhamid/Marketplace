import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../clients/services/cart.service';
import { WhishlistService } from '../clients/services/whishlist.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-product-details-pc',
  templateUrl: './product-details-pc.component.html',
  styleUrls: ['./product-details-pc.component.css']
})
export class ProductDetailsPcComponent implements OnInit {

  prod:any ;
  i :number ;
  @Input() splitted:any;
  constructor(private route:ActivatedRoute , private whishlistService : WhishlistService,
    private cartService: CartService , private notifyService:NotificationService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=> {
      this.prod = JSON.parse(decodeURIComponent(escape(atob(params['prod'])))) ;
      this.splitted = this.prod.description_prod.split('-');
  });
  
}
addToWhishlist(prod){
  this.whishlistService.addToCart(prod);
  this.showToasterSuccess() ;
}

addToCart(prod) {
  this.cartService.addToCart(prod);
  this.showToasterSuccess() ;
}
showToasterSuccess() {
  this.notifyService.showSuccess(
    'Product Added !!' );
}
}




/* var specialChars = ['.', '\\-', '_'];
      let strings = [];
      let indexStart;
      let indexEnd;
      for (let i = 0; i < (this.prod.description_prod).length; i++) {
          if (this.prod.description_prod[i] == '-') {
              indexStart = i + 1;
              if (indexStart >= 0) {
                for (let j = i + 1; j < this.prod.description_prod.length; j++) {
                    if (this.prod.description_prod[j] == '-') {
                        indexEnd = j ;
          let stringExtracted = (this.prod.description_prod).substring(indexStart, indexEnd);
          strings.push(stringExtracted);            }
          }
        }
      }
    }
    console.log(strings); */