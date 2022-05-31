import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  
  verifyEmail(model: any) {

      //let params = new HttpParams().set("token" , token)
      return this.http.post( this.Url  + 'verify-email', model);
  }

  getAllProducts(Id: string): Observable<any[]> {
   
   
      let params = new HttpParams()
              .set('Id', Id)
    
      console.log(params.toString());
    
      return this.http.get<any[]>(this.Url + 'GetAllProducts', {params});
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

    return this.http.get(this.Url + 'GetUserProfile' , {headers: headers}) 
  }
    


  AddFileDetails(data: FormData): Observable <string> {  
    let headers = new HttpHeaders();  
    headers.append('Content-Type', 'application/json');  
    const httpOptions = {  
        headers: headers  
    };  
    return this.http.post<string>(this.Url + 'addProduct', data, httpOptions);  
} 

  deleteProduit(val:any) {
  return this.http.delete(this.baseUrl+'Vendeur/'+ val);
}

  updateProduit(data: FormData){
  return this.http.put(this.baseUrl+'Vendeur',data);
}

  updateImage(data: FormData){
  return this.http.put(this.Url+'UpdateImage',data);
  }

  AddImageOrg(data: FormData){
    return this.http.put(this.Url+'AddImageOrg',data);
  }





}
