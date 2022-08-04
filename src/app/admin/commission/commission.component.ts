import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminClientService } from 'src/app/clients/admin-client.service';
import { LoginVendeurService } from 'src/app/login-vendeur.service';
import { Category } from 'src/app/models/Category';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.css']
})
export class CommissionComponent implements OnInit {
  userDetails ;
  listVendeurs ;
  listCommision;list; listc ; listcatg ;listcategr;
  cat:string= 'Smartphone' ;
  cate:string= 'PC Portable' ;
  catg:string= 'Climatiseur' ;
  catgr:string= 'Refrigérateur' ;
  catgri:string= 'Scanner' ;
  dataSource!:MatTableDataSource<any>;
  
  constructor(private service: AdminClientService , private userService: LoginVendeurService, private notifyService : NotificationService, 
      private router : Router ) { }

      displayedColumns: string[] = ['$categorie', 'commission'];
     
      categories: Category[] = [{category :'Smartphone'}, {category :'Laptop'}, {category :'Fridge'}, {category :'Air Conditioner'} , {category :'Printer'}];
    
      ngOnInit(): void {
  
      this.service.getAdmin().subscribe(
        res => {
          this.userDetails = res;
        }
      );
      this.service.GetCommissionByCategorie(this.cat).subscribe(
        res => {
          this.listCommision =res ;
        }
      ) 
      this.service.GetCommissionByCategorie(this.cate).subscribe(
        res => {
          this.list =res ;
        }
      )
       this.service.GetCommissionByCategorie(this.catg).subscribe(
        res => {
          this.listc =res ;
        }
      )
       this.service.GetCommissionByCategorie(this.catgr).subscribe(
        res => {
          this.listcatg =res ;
        }
      )
      this.service.GetCommissionByCategorie(this.catgri).subscribe(
        res => {
          this.listcategr =res ;
        }
      )
  }
  onLogout() {
    localStorage.removeItem('userInf');
    this.router.navigate(['/accueil']);
  }
  
  update(event:any , listCommision){
    let formData = new FormData();  
    formData.append('id', listCommision.id);
    formData.append('commission' , (<HTMLInputElement>document.getElementById("commission")).value) ;
   
    this.service.updateCommission(formData).subscribe(result => {
      this.showToasterSuccess();
     
    }); 
  }
  updatet(event:any , list){
    let formData = new FormData();  
    formData.append('id', list.id);
    formData.append('commission' , (<HTMLInputElement>document.getElementById("commissi")).value) ;
   
    this.service.updateCommission(formData).subscribe(result => {
      this.showToasterSuccess();
     
    }); 
  } updatec(event:any , listc){
    let formData = new FormData();  
    formData.append('id', listc.id);
    formData.append('commission' , (<HTMLInputElement>document.getElementById("commiss")).value) ;
   
    this.service.updateCommission(formData).subscribe(result => {
      this.showToasterSuccess();
     
    }); 
  } updateg(event:any , listcatg){
    let formData = new FormData();  
    formData.append('id', listcatg.id);
    formData.append('commission' , (<HTMLInputElement>document.getElementById("commis")).value) ;
   
    this.service.updateCommission(formData).subscribe(result => {
      this.showToasterSuccess();
     
    }); 
  } updategr(event:any , listcategr){
    let formData = new FormData();  
    formData.append('id', listcategr.id);
    formData.append('commission' , (<HTMLInputElement>document.getElementById("commi")).value) ;
   
    this.service.updateCommission(formData).subscribe(result => {
      this.showToasterSuccess();
     
    }); 
  } 
showToasterSuccess() {
  this.notifyService.showSuccess(
    'Commission updated  !!' );
}

}
