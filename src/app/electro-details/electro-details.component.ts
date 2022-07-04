import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WhishlistService } from '../clients/services/whishlist.service';

@Component({
  selector: 'app-electro-details',
  templateUrl: './electro-details.component.html',
  styleUrls: ['./electro-details.component.css']
})
export class ElectroDetailsComponent implements OnInit {

  produit:any ;
  i :number ;
  @Input() splitted:any;
  constructor(private route:ActivatedRoute, private whishlistService : WhishlistService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=> {
      this.produit = JSON.parse(atob(params['produit'])) ;
      this.splitted = this.produit.description_prod.split('-');
  });
  
}
addToWhishlist(produit){
  this.whishlistService.addToCart(produit)
}

}
