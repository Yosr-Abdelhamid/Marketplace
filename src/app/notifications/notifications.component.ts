import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginVendeurService } from '../login-vendeur.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  userDetails;
  listNotifs =[];
  id:string ;
  constructor(private router: Router,private userService :LoginVendeurService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      res => {
        this.userDetails = res;
        this.id =  this.userDetails.id ;
      this.userService.getAllNotifs(this.id).subscribe(
        res => {
          this.listNotifs = res;
        }
      )
  })
}

  remove(notif){
      if(confirm('Are you sure to delete this Message?')){
        this.userService.deleteNotif(notif.id).subscribe(data=>{
          //alert(data.toString());
          this.ngOnInit() ;
        })
      }
    
  }

   onLogout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/accueil']);
  }
}
