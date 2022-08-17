import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/alert/alert.service';
import { AdminClientService } from 'src/app/clients/admin-client.service';
import { LoginVendeurService } from 'src/app/login-vendeur.service';
import { mailrequest } from 'src/app/models/mailrequest';
import { PayedOrder } from 'src/app/models/PayedOrder';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-payment-order',
  templateUrl: './payment-order.component.html',
  styleUrls: ['./payment-order.component.css']
})
export class PaymentOrderComponent implements OnInit {
  totalAmount :number; 
  commission ;   
  value;test;newSolde
  prod;
  getOrde;
  filedata:any;
  show:boolean = false ;  
  payed ;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private service : AdminClientService
  ,private alertService: AlertService , private userService : LoginVendeurService,private notifyService : NotificationService ) { }

  ngOnInit(): void {
    this.service.GetOrderPayed(this.data.Order.id,this.data.id_v).subscribe(res =>{
      this.getOrde = res;
      console.log(this.data)
    
  })}
   

  apply()
 {
  this.test = this.getTotal(this.data.Order.produits) ;
  this.commission = this.test * 0.1;
  
 }

  getTotal(prices) {
    return prices.reduce((acc, {prix}) => acc += +(prix || 0), 0);
  }


  Applycomm() {

    let formData = new FormData();

    this.test = this.getTotal(this.data.Order.produits) ;
    this.commission = this.test * 0.1;
    if (this.data.solde > this.commission) {
      this.newSolde = this.data.solde - this.commission;
      this.updateSold();
      

      formData.append('id_order', this.data.Order.id);
      formData.append('id_vendeur', this.data.id_v);
      formData.append('datepayed' , formatDate(new Date(), 'yyyy-MM-dd', 'en'))
      this.service.OrderSellerPayed(formData).subscribe(res => {})
      this.alertService.success('Commission payed');
      this.ngOnInit();
     


    }
    else if (this.data.solde < this.commission) {
      this.alertService.error('Lack of Seller Sold !');
      var mailreq = <mailrequest>{} ;
      mailreq.email = this.data.email,
      this.service.SendNotifEmail(mailreq).subscribe(result => {
      });  
     
    }
     
  }

  updateSold() {
    let formData = new FormData();
    this.newSolde = this.data.solde - this.commission ;
    console.log(this.newSolde);         
    formData.append('Id_portf', this.data.id_portf);
    formData.append('Sold', this.newSolde);
    this.userService.updatePortfeuille(formData).subscribe(res => {
    }) ;

  }

  showToasterSuccess() {
    this.notifyService.showSuccess(
      'Commission payed' );
  }

}
