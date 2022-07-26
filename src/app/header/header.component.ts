import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminClientService } from '../clients/admin-client.service';
import { CartService } from '../clients/services/cart.service';
import { SharedService } from '../clients/services/shared.service';
import { WhishlistService } from '../clients/services/whishlist.service';
import { LoginVendeurService } from '../login-vendeur.service';
import { LoginComponent } from '../login/login.component';
import { Product } from '../models/Product';
import { ProductApiService } from '../product-api.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchTerm = '';
  produits:any ;
  allproducts:any = [];
  yourNewData = [];
  searchText: any;
  selectedDay:String ='';
 
  item : any;
  cartItemCount:number=0;
public totalItem : number = 0;
items:Product[] ;

  constructor( public dialog: MatDialog, public service : AdminClientService , 
    public prodService : LoginVendeurService  ,private router : Router ,private whislistService : WhishlistService , 
    private cartService : CartService , private shared : SharedService) { }


    items$ = this.cartService.items$;
    itemsW$ = this.whislistService.itemsW$;
  
  ngOnInit(): void {
    this.service.getListProducts().subscribe(
      res => {
        this.produits = res ;
        this.allproducts = this.produits ;
      })
      this.itemsW$ = this.whislistService.itemsW$ ;
      }

openDialog(){
  const dialogRef = this.dialog.open(LoginComponent, {
    id: 'dialog1'
  });
  console.log(dialogRef);
}

  search(value: string): void {
  this.produits = this.allproducts.filter((val) =>
    val.reference.toLowerCase().includes(value)
    );
    
  
}


searchB(){
//this.reference = (<HTMLInputElement>document.getElementById("ngop")).value ;
this.prodService.GetProductsReference((<HTMLInputElement>document.getElementById("ngop")).value).subscribe( res => {
  this.item = res ;
  this.router.navigate(['accueil/product-details'], {
    queryParams:{item:btoa(unescape(encodeURIComponent(JSON.stringify(this.item))))}
  });

} )
}

route(){ 
  this.router.navigate(['/whislist-Table']);
}

removeItem(item){
  this.itemsW$ = this.whislistService.itemsW$;
    this.whislistService.itemsW$.subscribe(result  => {
      this.items = result;
      console.log(this.items);
      const index = this.items.findIndex(o => o.id=== item.id);
      console.log(index);
      if (index > -1) {
        this.items.splice(index, 1);
        localStorage.setItem('whishlist',JSON.stringify(this.items));
     
    }})
    this.itemsW$ = this.whislistService.itemsW$ ;
}
}