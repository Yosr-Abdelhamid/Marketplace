import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { RequestProduct } from './models/RequestProduct';
import { ResponseModel } from './models/ResponseModel';
import { User } from './models/User';
import { Register } from './register';
import { ResponseCode } from './_helpers/ResponseCode';

export interface AuthenticatedResponse{
  token: string;}


  @Injectable({
  providedIn: 'root'
})
export class LoginVendeurService {
 
  token!: string;  
  header : any;  

  baseUrl ="https://localhost:7147/api/" ;
  Url ="https://localhost:7147/api/Vendeur/" ;

    constructor(private http : HttpClient) { 
  }

  Login(model : any){  
   
  const httpOptions  = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }),withCredentials: true
     };

   return this.http.post<ResponseModel>(this.Url+ 'authenticate' ,model , httpOptions)
       
  }  

  Signup(register:Register)  { 
    const httpOptions  = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }),withCredentials: true
     };
    
    return this.http.post<Register[]>(this.baseUrl + 'Vendeur', register , httpOptions)  
  } 

  forgotPassword(email: string) {
        return this.http.post(this.Url+  'forgot-password', { email });
  }
    
  resetPassword(token: string, password: string, confirmPassword: string) {
        return this.http.post(this.Url+  'reset-password', { token, password, confirmPassword });
    } 
  
  public getAll() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo")) ;
    const headers=new HttpHeaders({
        'Authorization':`Bearer ${ userInfo?.token}`
    });

    return this.http.get<ResponseModel>(this.Url+ 'GetAllUser' , {headers: headers}).pipe(map(res=>{
      let userList=new Array<User>();
      if(res.responseCode== 0)
        {  
            if(res.dateSet)
             {
             res.dateSet.map((x:User)=>{
                 userList.push(new User(x.id,x.nom,x.prenom,x.email,x.adresse,x.num_Telephone));
             })
             }
            }
            return userList;
      }));
  }

  public getUser() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo")) ;
    const headers=new HttpHeaders({
        'Authorization':`Bearer ${ userInfo?.token}`
    });

    return this.http.get(this.Url+ 'GetUserProfile' , {headers: headers}) }
    


  addProduct(requestProduct:RequestProduct , id:string , image_prod:File ){
    const httpOptions  = {headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),withCredentials: true
  };

    return this.http.post(this.Url+ 'addProduct',{requestProduct,id,image_prod} , httpOptions)
  }

  AddFileDetails(data: FormData): Observable <string> {  
    let headers = new HttpHeaders();  
    headers.append('Content-Type', 'application/json');  
    const httpOptions = {  
        headers: headers  
    };  
    return this.http.post<string>(this.Url + 'addProduct', data, httpOptions);  
}  
}
