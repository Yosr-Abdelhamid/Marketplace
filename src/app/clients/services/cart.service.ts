import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  allTotal: number;


  constructor() { 
    let existingCartItems = JSON.parse(localStorage.getItem('products'));
    if (!existingCartItems) {
      existingCartItems = [];
    }
    this.itemsSubject.next(existingCartItems);
  }

  private itemsSubject = new BehaviorSubject<Product[]>([]);
  items$ = this.itemsSubject.asObservable();
  
  getTotalPrice() : number{
    let grandTotal = 0;
    this.items$.pipe(map((a:any)=>{
      grandTotal += a.total;
    }))
    return grandTotal;
  }
  
  calculteAllTotal(items$)
  { 
    let total=0;
    for (let i in  items$) {
      total= total+( items$[i].quantityP* items$[i].prix_prod);
   }
   this.allTotal=total;
  }

  getProducts(){
    //return this.productList.asObservable();
    return JSON.parse(localStorage.getItem('product'));
    
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product: Product) {
    product.quantityP = 1 ;
    this.items$.pipe(
      take(1),
      map((products) => {
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
      }),
    ).subscribe();
  }

  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

  addProductToCart(products: any) {
    localStorage.setItem("product", JSON.stringify(products));
  }
  getProductFromCart() {
    //return localStorage.getItem("product");
    return JSON.parse(localStorage.getItem('product'));
  }
  removeAllProductFromCart() {
    return localStorage.removeItem("products");
  }
/*   updateCartCount(count: number) {
    this.currentCartCount.next(count)
  } */
}
