import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { RegisterVendeurComponent } from '../register-vendeur/register-vendeur.component';
import { LoginVendeurComponent } from '../login-vendeur/login-vendeur.component';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
 
})

export class AccueilComponent implements OnInit {


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


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(){
    const dialogRef = this.dialog.open(LoginVendeurComponent, {
      id: 'dialog1'
    });
    console.log(dialogRef);
  }
  
}
