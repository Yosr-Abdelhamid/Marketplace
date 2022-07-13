import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { LoginVendeurService } from 'src/app/login-vendeur.service';
import { IAlert } from 'src/app/models/IAlert';
import { Product } from 'src/app/models/Product';
import { NotificationService } from 'src/app/notification.service';
import { AdminClientService } from '../admin-client.service';
import { CartService } from '../services/cart.service';
import { SharedService } from '../services/shared.service';
import { WhishlistService } from '../services/whishlist.service';

@Component({
  selector: 'app-compte-client',
  templateUrl: './compte-client.component.html',
  styleUrls: ['./compte-client.component.css']
})
export class CompteClientComponent implements OnInit {

data:any=[];
sous_famille_prod = 'Smartphone' ;
sous_famille = 'PC Portable' ;
list_prod:any=[];
sf='Climatiseur'
cat ='Refrigérateur'  ;
list_clim:any=[];
list_fridg:any=[];
results ;

profile;
cartItemCount: number = 0;
public alerts: Array<IAlert> = [];
@Output() cartEvent = new EventEmitter<number>();
public globalResponse: any;
yourByteArray:any;
productAddedTocart:Product[];


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

  constructor(private service : AdminClientService , private router : Router, private notifyService: NotificationService,
    private sharedService : SharedService  ,private cartService : CartService , private whislitService : WhishlistService) { }

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
    this.whislitService.addToCart(item)
}

addToWhishlistt(prod){
  this.whislitService.addToCart(prod)
}
addToWhishliste(produit){
  this.whislitService.addToCart(produit)
}

  public closeAlert(alert:any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
}   
  routProd(item){
    this.router.navigate(['compte-client/prod-details'], {
      queryParams:{item:btoa(JSON.stringify(item))}
    });
  }
  routProdPC(prod){
    this.router.navigate(['compte-client/prod-details-pc'], {
      queryParams:{prod:btoa(JSON.stringify(prod))}
    });
  }
  routProdElect(produit){
    this.router.navigate(['compte-client/prod-details-electro'], {
      queryParams:{produit:btoa(JSON.stringify(produit))}
    });
  }
  
}
