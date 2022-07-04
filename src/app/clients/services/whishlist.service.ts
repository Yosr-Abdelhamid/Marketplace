import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {

  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  allTotal: number;
  items =[] ;


  constructor() { 
    let existingCartItems = JSON.parse(localStorage.getItem('whishlist'));
    if (!existingCartItems) {
      existingCartItems = [];
    }
    this.itemsSubject.next(existingCartItems);
  }

  private itemsSubject = new BehaviorSubject<Product[]>([]);
  itemsW$ = this.itemsSubject.asObservable();
  
  getTotalPrice() : number{
    let grandTotal = 0;
    this.itemsW$.pipe(map((a:any)=>{
      grandTotal += a.total;
    }))
    return grandTotal;
  }
  
  calculteAllTotal(itemsW$)
  { 
    let total=0;
    for (let i in  itemsW$) {
      total= total+( itemsW$[i].quantityP* itemsW$[i].prix_prod);
   }
   this.allTotal=total;
  }

  getProducts(){
    //return this.productList.asObservable();
    return JSON.parse(localStorage.getItem('whishlist'));
    
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product: Product) {
    product.quantityP = 1 ;
    this.itemsW$.pipe(
      take(1),
      map((whishlists) => {
        whishlists.push(product);
        localStorage.setItem('whishlist', JSON.stringify(whishlists));
      }),
    ).subscribe();
  }


  removeItem(item) {
    return localStorage.removeItem(item);
    
   /*  const index = this.items.findIndex(o => o.reference === item.id);

    if (index > -1) {
      this.items.splice(index, 1);
      JSON.parse(localStorage.getItem('whishlist'));
    } */
  }


  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

  removeAllProductFromCart() {
    return localStorage.removeItem("whishlist");
  }
/*   updateCartCount(count: number) {
    this.currentCartCount.next(count)
  } */
}

