import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';
import { OwlCarousel } from 'ngx-owl-carousel';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { RegisterVendeurComponent } from '../register-vendeur/register-vendeur.component';
import { LoginVendeurComponent } from '../login-vendeur/login-vendeur.component';
import { AdminClientService } from '../clients/admin-client.service';
import { LoginVendeurService } from '../login-vendeur.service';
import { WhishlistService } from 'src/app/clients/services/whishlist.service';
import { CartService } from '../clients/services/cart.service';
import { NotificationService } from '../notification.service';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
 
})

export class AccueilComponent implements OnInit {

data:any=[];
sous_famille_prod = 'Smartphone' ;
sous_famille = 'PC Portable' ; 
sf='Climatiseur'
cat ='Refrigérateur'  ;
public filterCategory : any
searchKey:string ="";

list_prod:any=[];
list_clim:any=[];
list_fridg:any=[];
results ;

  slidesStore!: [ { src:'./assets/images/product/large-size/1.jpg'},{ src:'./assets/images/product/large-size/2.jpg'},
  { src:'./assets/images/product/large-size/3.jpg'}

];

  customOptions: OwlOptions = {
    loop: false,
    items:5,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    nav: true
  }

  SlideCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 500,
    center:true,
    autoplay: true,
    stagePadding : 38,
    margin:75,
    navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
    },
    nav: true
  }
  SlideCustOptions: OwlOptions = {
    items:4,
    loop: true,
    autoplay: true,
    center:true,
    autoplayTimeout:7000,
    dots: false,
    navSpeed:1000,
    margin:8,
    autoHeight: true,
    autoWidth: false,
    rtl: true,
    stagePadding:2,
    lazyLoad: false,
    navText:['<button type="button" class="btn slider-left-btn" style:"height:50px"></button>','<button type="button" class="btn slider-right-btn" style:"height:50px"> </button>'],
  }

  constructor(public dialog: MatDialog , private service : AdminClientService, private router : Router,
    private whishlistService : WhishlistService , private cartService : CartService , private notifyService : NotificationService ) { }

  ngOnInit(): void {
    this.service.getProductByCategory(this.sous_famille_prod).subscribe(
      res => {
        this.data = res;
      })
    
    this.service.getProductByCategory(this.sous_famille).subscribe(
      res => {
        this.list_prod = res;
          })

    this.service.getProductByCategory(this.sf).subscribe(
      res => {
        this.list_clim = res;

          })

    this.service.getProductByCategory(this.cat).subscribe(
      res => {
        this.list_fridg = res;
        this.list_fridg.push(...this.list_clim);
        console.log(this.list_fridg.push(...this.list_clim)) ;
          })
   
  }

  openDialog(){
    const dialogRef = this.dialog.open(LoginVendeurComponent, {
      id: 'dialog1'
    });
    console.log(dialogRef);
  }

  routProd(item){
    this.router.navigate(['accueil/product-details'], {
      queryParams:{item:btoa(unescape(encodeURIComponent(JSON.stringify(item))))}
    });
  }
  routProdPC(prod){
    this.router.navigate(['accueil/product-details-pc'], {
      queryParams:{prod:btoa(unescape(encodeURIComponent(JSON.stringify(prod))))}
    });
  }

  routProdElect(produit){
    this.router.navigate(['accueil/product-details-electro'], {
      queryParams:{produit:btoa(unescape(encodeURIComponent(JSON.stringify(produit))))}
    });
  }

  addToCart(item) {
    this.cartService.addToCart(item);
    this.showToasterSuccess() ;
    }
  addToCartt(prod) {
    this.cartService.addToCart(prod);
    this.showToasterSuccess() ;

  }
  addToCarte(produit) {
    this.cartService.addToCart(produit);
    this.showToasterSuccess() ;

  }

  showToasterSuccess() {
  this.notifyService.showSuccess(
    'Product Added !!' );
    }



  addToWhishlist(item){
    this.whishlistService.addToCart(item);
    this.showToasterSuccess() ;
}
addToWhishlistt(prod){
  this.whishlistService.addToCart(prod);
  this.showToasterSuccess() ;
}
addToWhishliste(produit){
  this.whishlistService.addToCart(produit);
  this.showToasterSuccess() ;
}
  
}
