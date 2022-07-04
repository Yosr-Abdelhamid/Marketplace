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

  constructor(public dialog: MatDialog , private service : LoginVendeurService, private router : Router,
    private whishlistService : WhishlistService ) { }

  ngOnInit(): void {
    this.service.GetProductsByCategory(this.sous_famille_prod).subscribe(
      res => {
        this.data = res;
      })
    
    this.service.GetProductsCategory(this.sous_famille).subscribe(
      res => {
        this.list_prod = res;
          })

    this.service.GetProductsCategory(this.sf).subscribe(
      res => {
        this.list_clim = res;

          })

    this.service.GetProductsCategory(this.cat).subscribe(
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
      queryParams:{item:btoa(JSON.stringify(item))}
    });
  }
  routProdPC(prod){
    this.router.navigate(['accueil/product-details-pc'], {
      queryParams:{prod:btoa(JSON.stringify(prod))}
    });
  }

  routProdElect(produit){
    this.router.navigate(['accueil/product-details-electro'], {
      queryParams:{produit:btoa(JSON.stringify(produit))}
    });
  }
  addToWhishlist(item){
    this.whishlistService.addToCart(item)
}
addToWhishlistt(prod){
  this.whishlistService.addToCart(prod)
}
addToWhishliste(produit){
  this.whishlistService.addToCart(produit)
}
  
}
