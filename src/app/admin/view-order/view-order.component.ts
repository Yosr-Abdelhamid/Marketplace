import { Component, Inject, Input, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { map } from 'rxjs';
import { AlertService } from 'src/app/alert/alert.service';
import { AdminClientService } from 'src/app/clients/admin-client.service';
import { LoginVendeurService } from 'src/app/login-vendeur.service';
import { PayedOrder } from 'src/app/models/PayedOrder';
import { PaymentOrderComponent } from '../payment-order/payment-order.component';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
orders;
sum ;
totalAmount :number; 
commission ;   
value;test;newSolde
prod;
getOrde;
filedata:any;
show:boolean = false ;  
payed ;
@Input() inputfile: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private service : AdminClientService,
  public dialog: MatDialog, private alertService: AlertService , private userService : LoginVendeurService ) { }

  ngOnInit(): void {
    console.log(this.data)

    this.service.GetOrderByStore(this.data.organization).subscribe(
      res => {
       /*  res.forEach((item) => {
          this.service.GetOrderPayed(item.id).subscribe(res =>{
            this.getOrde = res;
            this.payed = this.getOrde.payed ;
        })}) */

          this.orders = res ;
          
        
      })
      
      
  }
  getTotal(prices) {
    return prices.reduce((acc, {prix}) => acc += +(prix || 0), 0);
  }
  apply(order) {
    //let filedata1 = this.inputfile;
    this.show = true ;
    this.test = this.getTotal(order.produits) ;
    this.commission = this.test * 0.1;
    var payed = <PayedOrder>{} ;
    payed.Organization = this.data.organization,
    payed.id_vendeur = this.data.id,
    payed.id_order = order.id
    this.service.AddOrderPayed(payed).subscribe(result =>{});
  }
 
  Applycomm(order) {

    let formData = new FormData();

    this.test = this.getTotal(order.produits) ;
    this.commission = this.test * 0.1;
    if (this.data.sold > this.commission) {
      this.newSolde = this.data.sold - this.commission;
      this.updateSold();
      

      formData.append('id_order', order.id);
      this.service.OrderSellerPayed(formData).subscribe(res => {
       })



    }
    else if (this.data.sold < this.commission) {
      this.alertService.error('Lack of Seller Sold !');
    }
     
  }

  updateSold() {
    let formData = new FormData();
    this.newSolde = this.data.sold - this.commission ;
    console.log(this.newSolde);         
    formData.append('Id_portf', this.data.id_portf);
    formData.append('Sold', this.newSolde);
    this.userService.updatePortfeuille(formData).subscribe(res => {
      this.alertService.success('Commission payed')
    }) ;

  }


  opendialog(order){
    var payed = <PayedOrder>{} ;
    payed.Organization = this.data.organization,
    payed.id_vendeur = this.data.id,
    payed.id_order = order.id 
    this.service.AddOrderPayed(payed).subscribe(result =>{});
    this.dialog.open(PaymentOrderComponent ,{
      data : {Order: order ,solde:this.data.sold, id_v:this.data.id , org:this.data.organization,
         id_portf: this.data.id_portf , email:this.data.email  },
      width:'600px', position: {
        top: '170px'
      },
  });
  


  }
 
}


