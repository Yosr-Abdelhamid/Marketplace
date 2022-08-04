import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { LoginVendeurService } from '../login-vendeur.service';
import { Portfeuille } from '../models/Portfeuille';

@Component({
  selector: 'app-pocket',
  templateUrl: './pocket.component.html',
  styleUrls: ['./pocket.component.css']
})
export class PocketComponent implements OnInit {

  userDetails ;
  pocketForm : any ;
  
  constructor(private userService:LoginVendeurService , private router:Router ,
    private alertService : AlertService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      res => {
        this.userDetails = res;
      }
    );
  }

  onLogout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/accueil']);
  }

  addPortfeuille(){
    var portfeuille = <Portfeuille>{} ;

    portfeuille.CardName  = (<HTMLInputElement>document.getElementById("cardName")).value ,
    portfeuille.CardNumber = (<HTMLInputElement>document.getElementById("cardNumber")).value ,
    portfeuille.ExpireDate = (<HTMLInputElement>document.getElementById("dateExp")).value ,
    portfeuille.CVV = (<HTMLInputElement>document.getElementById("CVV")).value ,
    portfeuille.Sold = (<HTMLInputElement>document.getElementById("sold")).value ,
    portfeuille.Id = this.userDetails.id ;

    this.userService.AddPortfeuille(portfeuille).subscribe(result => {
      this.alertService.success('Operation finished with success !');
      this.ngOnInit();

    })

    
  }

}
