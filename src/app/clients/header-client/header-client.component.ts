import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { AdminClientService } from '../admin-client.service';
import { CartService } from '../services/cart.service';
import { SharedService } from '../services/shared.service';
import { WhishlistService } from '../services/whishlist.service';

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.css']
})
export class HeaderClientComponent implements OnInit {
profile ;
cartItemCount:number=0;
public totalItem : number = 0;
items:Product[] ;

  constructor(private userService :AdminClientService ,private router :Router ,
    private whislistService : WhishlistService , private cartService : CartService , private shared : SharedService) { }

  items$ = this.cartService.items$;
  itemsW$ = this.whislistService.itemsW$;


  ngOnInit(): void {
    this.userService.getClient().subscribe( res => {
      this.profile = res ;
      console.log(this.profile.nom)
    })
    this.itemsW$ = this.whislistService.itemsW$ ;
   /*  this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    }) */

    //this.shared.currentMessage.subscribe(msg => this.cartItemCount = msg);
  }
  Logout(){
    localStorage.removeItem('userInf');
    this.router.navigate(['/accueil']);
  }
  route(){
    this.router.navigate(['/whislist-Table']);
  }

  removeItem(item){
    this.itemsW$ = this.whislistService.itemsW$;
      this.whislistService.itemsW$.subscribe(result  => {
        this.items = result;
        console.log(this.items);
        const index = this.items.findIndex(o => o.id_prod === item.id_prod);
        console.log(index);
        if (index > -1) {
          this.items.splice(index, 1);
          JSON.parse(localStorage.getItem('whishlist'));
       
      }})
      this.itemsW$ = this.whislistService.itemsW$ ;
  }
}
