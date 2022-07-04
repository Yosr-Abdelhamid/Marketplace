import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Acheteur } from '../models/Acheteur';
import { Commande } from '../models/Commande';
import { Contact } from '../models/Contact';
import { ContactRequest } from '../models/ContactRequest';
import { PasswordReset } from '../models/PasswordReset';
import { ProductResult } from '../models/ProductResult';
import { RequestProduct } from '../models/RequestProduct';
import { ResponseModel } from '../models/ResponseModel';
import { User } from '../models/User';
import { Utilisateur } from '../models/Utilisateur';
import { Client } from './Client';

@Injectable({
  providedIn: 'root'
})
export class AdminClientService {
  token!: string;  
  header : any;  

  baseUrl ="https://localhost:7147/api/ClientAdmin/" ;
  url ="https://localhost:7147/api/" ;

  constructor(private http: HttpClient) { }

    Signup(client:Client)  { 
    const httpOptions  = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }),withCredentials: true
     };
    
    return this.http.post<Client[]>(this.baseUrl + 'RegisterClient', client , httpOptions)  
  } 

  verifyEmail(model: any) {
    return this.http.post( this.baseUrl  + 'verify-email', model);
  }

  Login(model : any){  
   
  const httpOptions  = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }),withCredentials: true
     };

   return this.http.post<ResponseModel>(this.baseUrl+ 'LoginUser' ,model , httpOptions)
       
  } 


  public getAdmin() {
    let userInfo = JSON.parse(localStorage.getItem("userInf")) ;
    const headers=new HttpHeaders({
        'Authorization':`Bearer ${ userInfo?.token}`
    });

    return this.http.get(this.baseUrl + 'GetAdminProfile' , {headers: headers}) 
  }

  public getClient() {
    let userInfo = JSON.parse(localStorage.getItem("userInf")) ;
    const headers=new HttpHeaders({
        'Authorization':`Bearer ${ userInfo?.token}`
    });

    return this.http.get(this.baseUrl + 'GetClientProfile' , {headers: headers}) 
  }

  public getAllClients() {
    let userInfo = JSON.parse(localStorage.getItem("userInf")) ;
    const headers=new HttpHeaders({
        'Authorization':`Bearer ${ userInfo?.token}`
    });

    return this.http.get<ResponseModel>(this.baseUrl+ 'GetAllClients' , {headers: headers}).pipe(map(res=>{
      let userList=new Array<Utilisateur>();
      if(res.responseCode== 0)
        {  
            if(res.dateSet)
             {
             res.dateSet.map((x:Utilisateur)=>{
                 userList.push(new Utilisateur(x.id,x.nom,x.prenom,x.email,x.adresse,x.num_Telephone,x.zipCode));
             })
             }
            }
            return userList;
      }));
  }
  public getListProducts() {

    return this.http.get<RequestProduct>(this.baseUrl + 'GetListProducts').pipe(map(data =>{
      let productsList =  new Array<ProductResult>();
      for (let key in data)
          if (data.hasOwnProperty(key))
              productsList.push(
              new ProductResult (
                data[key].reference ,
                data[key].quantity,
                data[key].prix_prod,
                data[key].image_prod,
                data[key].vendeurs[0].organization) )
              return productsList ;
    }))
  }


  AddContact(contact:Contact)  { 
    const httpOptions  = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }),withCredentials: true
     };
    
    return this.http.post<Contact[]>(this.baseUrl + 'AddContact', contact , httpOptions)  
  } 


  AddOrder(commande:Commande)  { 
    const httpOptions  = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }),withCredentials: true
     };
    
    return this.http.post<Commande[]>(this.baseUrl + 'AddOrder', commande , httpOptions)  
  } 

  GetContact():Observable<any[]>  { 
  
    return this.http.get<any[]>(this.baseUrl + 'GetContact')  
  } 

  SendEmail(request:ContactRequest){  

    const httpOptions  = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }),withCredentials: true
     };
    return this.http.post<ContactRequest[]>(this.baseUrl+ 'ReplyToContact' ,request, httpOptions);
  }

  deleteContact(val:any) {
    return this.http.delete(this.url+ 'ClientAdmin/' + val);
  }

  forgotPassword(email: string) {
    return this.http.post(this.baseUrl+  'forgot-password-user', { email });
}

  resetPassword(requestPass: PasswordReset) {
    return this.http.post(this.baseUrl+  'reset-password-user',requestPass);
}
}
