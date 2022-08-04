import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { CartService } from '../services/cart.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';

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
  //Quantity:number = 1 ;
  items$ ;
  items:Product[] ;
  delete ;
  constructor(private cartService : CartService , private router : Router  , private notifyService : NotificationService) { }
  //items$ = this.cartService.items$;
 

  deliveryForm:FormGroup;
  ngOnInit(): void {
    this.items$ = this.cartService.items$;
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

      if(product.quantity > product.quantityP ) 
      {
        product.quantityP = product.quantityP+1;
        console.log(product.quantityP);
        this.cartService.items$.subscribe(result  => {
          this.productAddedTocart = result;
          console.log(this.productAddedTocart);
          this.calculteAllTotal(this.productAddedTocart)

    })} else {
          this.showToasterStop();

    }
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
  this.items$ = this.cartService.items$;
 }

 removeItem(prod) {
  this.items$ = this.cartService.items$;
  this.cartService.items$.subscribe(result  => {
    this.items = result;
    console.log(this.items);
    const index = this.items.findIndex(o => o.id === prod.id);
    console.log(prod.reference) ;
    console.log(index);
    if (index > -1) {
      this.items.splice(index, 1);
      localStorage.setItem('products',JSON.stringify(this.items));
  }})
  this.showToasterSuccess() ;
  
  this.items$ = this.cartService.items$ ;
}

CheckOut(){
  this.router.navigate(['/login-user']);
}

showToasterSuccess() {
  this.notifyService.showError(
    'Product Deleted !!' );
}

showToasterStop() {
  this.notifyService.showError(
    'Stock Limit !!' );
    }


}
