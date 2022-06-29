import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginVendeurService } from 'src/app/login-vendeur.service';

@Component({
  selector: 'app-smartphones',
  templateUrl: './smartphones.component.html',
  styleUrls: ['./smartphones.component.css']
})
export class SmartphonesComponent implements OnInit {
sous_famille_prod = 'Smartphone' ;
p:any;
data:any=[];
     

  constructor(private service : LoginVendeurService, private router :Router) { }

  ngOnInit(): void {

  this.service.GetProductsByCategory(this.sous_famille_prod).subscribe(
    res => {
      this.data = res;
    }
  )
  //this.getData({ pageIndex: this.page, pageSize: this.size });

  }
  routProd(item){
    this.router.navigate(['accueil/product-details'], {
      queryParams:{item:btoa(JSON.stringify(item))}
    });
    

  }
}
