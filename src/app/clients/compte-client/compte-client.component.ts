import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { LoginVendeurService } from 'src/app/login-vendeur.service';
import { IAlert } from 'src/app/models/IAlert';
import { Product } from 'src/app/models/Product';
import { AdminClientService } from '../admin-client.service';
import { CartService } from '../services/cart.service';
import { SharedService } from '../services/shared.service';

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
    navSpeed: 1700,
    navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    nav: true
  }

  SlideCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    center:true,
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
    dots: false,
    navSpeed:1000,
    autoHeight: true,
    autoWidth: false,
    rtl: false,
    stagePadding:2,
    lazyLoad: false,
    navText:['<button type="button" class="btn slider-left-btn"> </button>','<button type="button" class="btn slider-right-btn"> </button>'],
  }

  constructor(private service : LoginVendeurService , private router : Router, 
    private sharedService : SharedService  ,private cartService : CartService) { }

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

  addToCart(item) {
    this.cartService.addToCart(item);
  }
  addToCartt(prod) {
    this.cartService.addToCart(prod);
  }
  addToCarte(produit) {
    this.cartService.addToCart(produit);
  }

/*   addtocart(item: any){
    this.cartService.addtoCart(item);
  } */

  /* OnAddCart(product:Product)
  {
  
    {
      console.log(product);
      
      this.productAddedTocart=this.cartService.getProductFromCart();
      if(this.productAddedTocart==null)
      {
        this.productAddedTocart=[];
        this.productAddedTocart.push(product);
        this.cartService.addProductToCart(this.productAddedTocart);
        this.alerts.push({
          id: 1,
          type: 'success',
          message: 'Product added to cart.'
        });
        setTimeout(()=>{   
          this.closeAlert(this.alerts);
     }, 3000);

      }
      else
      {
        let tempProduct=this.productAddedTocart.find(p=>p.Id_prod==product.Id_prod);
        if(tempProduct==null)
        {
          this.productAddedTocart.push(product);
          this.cartService.addProductToCart(this.productAddedTocart);
          this.alerts.push({
            id: 1,
            type: 'success',
            message: 'Product added to cart.'
          });
          //setTimeout(function(){ }, 2000);
          setTimeout(()=>{   
            this.closeAlert(this.alerts);
       }, 3000);
        }
        else
        {
          this.alerts.push({
            id: 2,
            type: 'warning',
            message: 'Product already exist in cart.'
          });
          setTimeout(()=>{   
            this.closeAlert(this.alerts);
       }, 3000);
        }
        
      }
      //console.log(this.cartItemCount);
      this.cartItemCount=this.productAddedTocart.length;
      this.cartEvent.emit(this.cartItemCount);
      this.sharedService.updateCartCount(this.cartItemCount);
    }
  } */
  public closeAlert(alert:any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
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
  
}
