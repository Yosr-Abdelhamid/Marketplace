import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from './register';

@Injectable({
  providedIn: 'root'
})
export class LoginVendeurService {
 
  token!: string;  
  header : any;  

  baseUrl ="https://localhost:7147/api/" ;
  Url ="https://localhost:7147/api/Vendeur/" ;

    constructor(private http : HttpClient) {  }  

  Login(model : any){  
   
  const httpOptions  = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }),withCredentials: true
     };

   return this.http.post<any>(this.Url+ 'authenticate' ,model , httpOptions);  
  }  

   Signup(register:Register)  { 
    const httpOptions  = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }),withCredentials: true
     };
    
    return this.http.post<Register[]>(this.baseUrl + 'Vendeur', register , httpOptions)  
   }  
}
