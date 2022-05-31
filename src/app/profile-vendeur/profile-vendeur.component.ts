import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginVendeurService } from '../login-vendeur.service';

@Component({
  selector: 'app-profile-vendeur',
  templateUrl: './profile-vendeur.component.html',
  styleUrls: ['./profile-vendeur.component.css']
})
export class ProfileVendeurComponent implements OnInit {
userDetails ;
  constructor(private userService:LoginVendeurService , private router:Router) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      res => {
        this.userDetails = res;
      }
    );
  }

  processFile(imageInput){
    
  }
  onLogout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/accueil']);
  }
}
