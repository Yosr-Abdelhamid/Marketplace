import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginVendeurService } from '../login-vendeur.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  userDetails ;
  constructor(private userService:LoginVendeurService , private router : Router) { }

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


}
