import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { CartService } from '../services/cart.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  dafualtQuantity:number=1;
  allTotal:number ;
  sum;
  productAddedTocart:Product[];
  Quantity:number = 1 ;
  constructor(private cartService : CartService) { }
  items$ = this.cartService.items$;
 

  deliveryForm:FormGroup;
  ngOnInit(): void {
    this.productAddedTocart=this.cartService.getProductFromCart();

    this.cartService.items$.subscribe(result  => {
       this.productAddedTocart = result;
       console.log(this.productAddedTocart);
       this.calculteAllTotal(this.productAddedTocart);

    });


/*   this.productAddedTocart=this.cartService.getProductFromCart();
  for (let i in this.productAddedTocart) {
    this.productAddedTocart[i].Quantity=1;
 }
 this.cartService.removeAllProductFromCart();
 this.cartService.addProductToCart(this.productAddedTocart);
 this.calculteAllTotal(this.productAddedTocart); */

  }

  onAddQuantity(product:Product)
  {
    product.quantityP = product.quantityP+1;
    this.cartService.items$.subscribe(result  => {
      this.productAddedTocart = result;
      console.log(this.productAddedTocart);
      this.calculteAllTotal(this.productAddedTocart);

   });

  
  }
  onRemoveQuantity(product:Product)
  {
    product.quantityP = product.quantityP-1;
    this.cartService.items$.subscribe(result  => {
      this.productAddedTocart = result;
      console.log(this.productAddedTocart);
      this.calculteAllTotal(this.productAddedTocart);

   });
   
  }


  calculteAllTotal(allItems:Product[])
  {
    let total=0;
    for (let i in allItems) {
      total= total+(allItems[i].quantityP*allItems[i].prix_prod);
   }
   this.allTotal=total;
  }

  removeall(){
  this.cartService.removeAllProductFromCart() ;
  this.ngOnInit() ; }
}
