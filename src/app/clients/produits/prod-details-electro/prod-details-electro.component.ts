import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-prod-details-electro',
  templateUrl: './prod-details-electro.component.html',
  styleUrls: ['./prod-details-electro.component.css']
})
export class ProdDetailsElectroComponent implements OnInit {

  produit:any ;
  i :number ;
  @Input() splitted:any;
  constructor(private route:ActivatedRoute , private cartService : CartService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=> {
      this.produit = JSON.parse(atob(params['produit'])) ;
      this.splitted = this.produit.description_prod.split('-');
  });
  
}
addToCart(produit) {
  this.cartService.addToCart(produit);
}

}
