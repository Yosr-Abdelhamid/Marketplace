import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminClientService } from 'src/app/clients/admin-client.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-commandes-by-seller',
  templateUrl: './commandes-by-seller.component.html',
  styleUrls: ['./commandes-by-seller.component.css']
})
export class CommandesBySellerComponent implements OnInit {

  userDetails ;
  
    constructor(private service: AdminClientService , private notifyService : NotificationService, 
      private router : Router ) { }
  
    ngOnInit(): void {
  
      this.service.getAdmin().subscribe(
        res => {
          this.userDetails = res;
        }
      );
  }
  onLogout() {
    localStorage.removeItem('userInf');
    this.router.navigate(['/accueil']);
  }

}
