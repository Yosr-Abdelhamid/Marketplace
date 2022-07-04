import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WhishlistService } from 'src/app/clients/services/whishlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  item:any ;
   @Input() splitted:any;
  constructor(private route:ActivatedRoute ,private whishlistService : WhishlistService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=> {
      this.item = JSON.parse(atob(params['item'])) ;
      this.splitted = this.item.description_prod.split('-');
  });
}

 addToWhishlist(item){
      this.whishlistService.addToCart(item)
  }
}
