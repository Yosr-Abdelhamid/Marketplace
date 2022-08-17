import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {concatMap, tap} from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { AdminClientService } from 'src/app/clients/admin-client.service';
import { LoginVendeurService } from 'src/app/login-vendeur.service';
import { OrderList } from 'src/app/models/OrderList';
import { ResponseModel } from 'src/app/models/ResponseModel';
import { User } from 'src/app/models/User';
import { NotificationService } from 'src/app/notification.service';
import { ViewOrderComponent } from '../view-order/view-order.component';

@Component({
  selector: 'app-commandes-by-seller',
  templateUrl: './commandes-by-seller.component.html',
  styleUrls: ['./commandes-by-seller.component.css']
})
export class CommandesBySellerComponent implements OnInit {

  userDetails ;
  listVendeurs ;
  i:number;
  orders;
  list: Array<any>= [] ;
  prod ;
  id_vend ;
  groupArr : any = [];
  groupO : any = [];
  org;nom;
  loadedCharacter: {};
  show :boolean=false ;
  ObjMap ={};
  Object = Object;
  keys: String[];
  Url ="https://localhost:7147/api/Vendeur/" ;
  
    constructor(private service: AdminClientService ,private http : HttpClient ,
      private userService: LoginVendeurService, private notifyService : NotificationService, 
      private dialog: MatDialog,
      private router : Router ) { }
  
    ngOnInit(): void {
  
      this.service.getAdmin().subscribe(
        res => {
          this.userDetails = res;
        }
      );

     this.userService.getPocketSeller()
      .subscribe((response) => { 
        this.listVendeurs= response }) ;
      }

    
view(seller){
        this.dialog.open(ViewOrderComponent ,{
          data : seller,
          width:'600px', position: {
            top: '70px'
          },
      });
      }




          /* this.orders = res.reduce((h, car) => Object.assign(h, { [car.id]:( h[car.id] || [] ).
            concat({status: car.delivred, Nom: car.nom, Prenom:car.prenom, Organisation:car.organisation, produits:car.produits}) }), {})

           this.listVendeurs = this.orders; */
          //var groupe = this.groupBy(res, (c) => c.id);
          //this.grouped.push(groupe) ;
          //console.log(this.grouped);
          
/* 
          res.forEach(element => {
            var idKey = element.id;
             if(!this.ObjMap[idKey]) {
               this.ObjMap[idKey] = [];
             }
        
            this.ObjMap[idKey].push({
              delivred: element.delivred,
              nom: element.nom,
              prenom: element.prenom,
              organisation: element.organisation,
              produits:element.produits
            });
           });
           console.log(this.ObjMap);
           this.keys = Object.keys(this.ObjMap); */

          
       
      

                   
 
            
     
    

    /* this.userService.getAll()
        .subscribe((response) => { 
          this.listVendeurs = response ;
  }); 
   /* this.userService.getAll().subscribe(
    res => {
  
      res.forEach((item) => {
        this.list.push(item.nom)
        this.list.push(item.prenom)
        this.list.push(item.email)
        this.list.push(item.organization)
        this.service.GetOrderByStore(item.organization).subscribe(
          res => {
              this.orders = res ;
              this.list.push(this.orders)
              console.log(this.list)
          })
    })}) */ 

    

  onLogout() {
    localStorage.removeItem('userInf');
    this.router.navigate(['/accueil']);
  }

}









/* this.service.GetOrdersBySeller().subscribe(
  res => {
    this.listVendeurs = res;

    this.groupArr = this.listVendeurs.reduce((r,{organisation,nom,prenom})=>{
      if(!r.some(o=>o.organisation==organisation)&&!r.some(o=>o.nom==nom)
      &&!r.some(o=>o.prenom==prenom)){
        r.push({organisation,nom,prenom,groupItem:this.listVendeurs.
          filter(v=>v.organisation==organisation && v.nom==nom && v.prenom==prenom)});
        
        } return r;
        
      },[]);
      this.groupArr.forEach((item) => {
        console.log(item.organisation)
      this.service.GetOrderByStore(item.organisation).subscribe(
        res => {
            this.orders = res ;});

          })
  console.log(this.groupArr)
  console.log(this.listVendeurs) */
 