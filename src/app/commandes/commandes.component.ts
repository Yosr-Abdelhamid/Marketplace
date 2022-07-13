import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminClientService } from '../clients/admin-client.service';
import { LoginVendeurService } from '../login-vendeur.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';  

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  userDetails ;
  orders ;
  @ViewChild('collapseOne') collapseOne:ElementRef;
  constructor(private userService:LoginVendeurService ,private service : AdminClientService , private router : Router) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      res => {
        this.userDetails = res;
      
        this.service.GetOrderByStore(this.userDetails.organization).subscribe(
          res => {
              this.orders = res
          }
        )
      
      }
    );
     }
     
  onLogout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/accueil']);
  }
  SavePDF(): void {  
  let DATA: any = document.getElementById('collapseOne');
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


}
