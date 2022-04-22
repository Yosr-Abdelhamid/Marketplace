import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  baseURL ="https://localhost:7147/api/Produit/" ;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate: new FormControl(''),
    isPermanent: new FormControl(false)
  });

  constructor(private http:HttpClient) { }
  
  getInspectionList(Reference: string): Observable<any[]> {
   
   
    let params = new HttpParams()
            .set('reference', Reference)
  
    console.log(params.toString());
  
    return this.http.get<any[]>(this.baseURL + 'SearchProduitAsync', {params});
  }

  getSimilaireList(Reference: string , sous_famille:string): Observable<any[]> {
   
    let params = new HttpParams()
            .set('reference', Reference)
            .set('categorie', sous_famille)
  
    console.log(params.toString());
  
    return this.http.get<any[]>(this.baseURL + 'ProduitSimilairesAsync', {params});
  }



  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      department: 0,
      hireDate: '',
      isPermanent: false
    });
  }


}
