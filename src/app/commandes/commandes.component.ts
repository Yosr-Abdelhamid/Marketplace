import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminClientService } from '../clients/admin-client.service';
import { LoginVendeurService } from '../login-vendeur.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';  
import { NotificationService } from '../notification.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  userDetails ;
  orders ;
  id : string='' ;
  i : number ;
  delive : boolean = false ;
  checked : boolean = false  ;
  checkboxes = document.querySelectorAll('input[type=checkbox]');
  solde ;

  @ViewChild('collapseOneShow') collapseOne:ElementRef;
  constructor(private userService:LoginVendeurService ,private service : AdminClientService ,
     private router : Router , private notifyService : NotificationService) { }

  
  ngOnInit(): void {
    this.userService.getUser().subscribe(
      res => {
        this.userDetails = res;
        
        this.service.GetOrderByStore(this.userDetails.organization).subscribe(
          res => {
              this.orders = res ;
            
          }
          
        )

        this.userService.GetPortfeuille(this.userDetails.id).subscribe(
          res => {
            this.solde = res ;
          }
        )
      },
      );
     }
     delivred(order){
      let formData = new FormData();
      formData.append('Id' , order.id);
      formData.append('dateCommande' , formatDate(new Date(), 'yyyy-MM-dd', 'en'))
      this.service.DelivredCommande(formData).subscribe(result => {
        this.showToasterSuccess();
        this.ngOnInit();})
        
      } 

      rejected(order){
        let formData = new FormData();
      formData.append('Id' , order.id);
      formData.append('dateCommande' , formatDate(new Date(), 'yyyy-MM-dd', 'en'))
      this.service.RejectedCommande(formData).subscribe(result => {
        this.ngOnInit();
      
      })}


    showToasterSuccess() {
    this.notifyService.showSuccess(
      'Product Delivred !!' );
      }
     
  onLogout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/accueil']);
  }
  SavePDF(): void {  
  let DATA: any = document.getElementById('collapseOneShow');
  html2canvas(DATA).then((canvas) => {
    let fileWidth = 208;
    let fileHeight = (canvas.height * fileWidth) / canvas.width;
    const FILEURI = canvas.toDataURL('image/png');
    let PDF = new jsPDF('p', 'mm', 'a4');
    let position = 0;
    PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    PDF.save('order.pdf');
  });
}


deliver(order){
  let formData = new FormData();
      formData.append('Id' , order.id);
      formData.append('dateCommande' , formatDate(new Date(), 'yyyy-MM-dd', 'en'))
      this.service.updateCommande(formData).subscribe(result => {
        this.showToasterSuccess()})
      this.ngOnInit();

      } 
    
}


