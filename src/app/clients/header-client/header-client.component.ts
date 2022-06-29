import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminClientService } from '../admin-client.service';
import { CartService } from '../services/cart.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.css']
})
export class HeaderClientComponent implements OnInit {
profile ;
cartItemCount:number=0;
public totalItem : number = 0;

  constructor(private userService :AdminClientService ,private router :Router , private cartService : CartService , private shared : SharedService) { }

  items$ = this.cartService.items$;

  ngOnInit(): void {
    this.userService.getClient().subscribe( res => {
      this.profile = res ;
      console.log(this.profile.nom)
    })
   /*  this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    }) */

    //this.shared.currentMessage.subscribe(msg => this.cartItemCount = msg);
  }
  Logout(){
    localStorage.removeItem('userInf');
    this.router.navigate(['/accueil']);
  }

}
