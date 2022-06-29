import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-prod-details-pc',
  templateUrl: './prod-details-pc.component.html',
  styleUrls: ['./prod-details-pc.component.css']
})
export class ProdDetailsPcComponent implements OnInit {

  prod:any ;
  i :number ;
  @Input() splitted:any;
  constructor(private route:ActivatedRoute , private cartService : CartService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=> {
      this.prod = JSON.parse(atob(params['prod'])) ;
      this.splitted = this.prod.description_prod.split('-');
  });
  
}

addToCart(prod) {
  this.cartService.addToCart(prod);
}

}
