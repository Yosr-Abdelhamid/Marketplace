import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';  
 
import { AdminClientService } from 'src/app/clients/admin-client.service';

@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.css']
})
export class ListCommandeComponent implements OnInit {

 userDetails ;
 orders ;
 @ViewChild('collapseOne') collapseOne:ElementRef;  

constructor(private service: AdminClientService, private router : Router , private adminService : AdminClientService) { }
  

ngOnInit(): void {
    this.service.getAdmin().subscribe(
      res => {
        this.userDetails = res;
        }
      );

    this.adminService.GetOrders().subscribe(
      res => {
        this.orders =  res;
      }
    )
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

onLogout() {
  localStorage.removeItem('userInf');
  this.router.navigate(['/accueil']);
    
}
}
