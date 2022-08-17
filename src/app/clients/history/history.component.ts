import { Component, OnInit } from '@angular/core';

import { AdminClientService } from '../admin-client.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  orders ;
  profile ;
  email :string='' ;
  //delivred = false ;
 
  constructor(private adminService : AdminClientService) { }

  ngOnInit(): void {
    this.adminService.getClient().subscribe( res => {
      this.profile = res ;
      this.email = this.profile.email
      console.log(this.email);
      this.adminService.GetOrderByEmail(this.email).subscribe(
        res => {
          this.orders =  res;
          //this.delivred = this.orders.delivred
        }
      )
   
    }) ;
     
  }
 

}
