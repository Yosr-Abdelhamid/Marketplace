import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-prod-details-phone',
  templateUrl: './prod-details-phone.component.html',
  styleUrls: ['./prod-details-phone.component.css']
})
export class ProdDetailsPhoneComponent implements OnInit {

  item:any ;
   @Input() splitted:any;
  constructor(private route:ActivatedRoute , private cartService: CartService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=> {
      this.item = JSON.parse(atob(params['item'])) ;
      this.splitted = this.item.description_prod.split('-');
  });
}

addToCart(item) {
  this.cartService.addToCart(item);
}
}
