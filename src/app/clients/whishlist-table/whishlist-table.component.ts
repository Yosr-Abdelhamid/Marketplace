import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { NotificationService } from 'src/app/notification.service';
import { CartService } from '../services/cart.service';
import { WhishlistService } from '../services/whishlist.service';

@Component({
  selector: 'app-whishlist-table',
  templateUrl: './whishlist-table.component.html',
  styleUrls: ['./whishlist-table.component.css']
})
export class WhishlistTableComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  dafualtQuantity:number=1;
  allTotal:number ;
  sum;
  productAddedTocart:Product[];
  Quantity:number = 1 ;
  itemsW$ ;
  items:Product[] ;
  constructor(private whishlistService : WhishlistService ,private cartService : CartService, private notifyService: NotificationService) { }
  //items$ = this.cartService.items$;
 
  ngOnInit(): void {
    this.itemsW$ = this.whishlistService.itemsW$;
    this.whishlistService.itemsW$.subscribe(result  => {
       this.productAddedTocart = result;
       console.log(this.productAddedTocart)

    });


/*   this.productAddedTocart=this.cartService.getProductFromCart();
  for (let i in this.productAddedTocart) {
    this.productAddedTocart[i].Quantity=1;
 }
 this.cartService.removeAllProductFromCart();
 this.cartService.addProductToCart(this.productAddedTocart);
 this.calculteAllTotal(this.productAddedTocart); */

  }
  removeItem(prod) {
      this.itemsW$ = this.whishlistService.itemsW$;
      this.whishlistService.itemsW$.subscribe(result  => {
        this.items = result;
        console.log(this.items);
        const index = this.items.findIndex(o => o.id_prod === prod.id_prod);
        if (index > -1) {
          this.items.splice(index, 1);
          JSON.parse(localStorage.getItem('whishlist'));
       
      }})
      this.itemsW$ = this.whishlistService.itemsW$ ;
    }

  removeall(){
  this.whishlistService.removeAllProductFromCart() ;
  this.ngOnInit(); }

  addToCart(prod){
    this.cartService.addToCart(prod);
    this.showToasterSuccess() ;

  }

  showToasterSuccess() {
  this.notifyService.showSuccess(
    'Product Added !!' );
    }




}


