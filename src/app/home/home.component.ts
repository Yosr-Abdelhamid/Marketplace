import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductApiService } from '../product-api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LoginVendeurService } from '../login-vendeur.service';
import { User } from '../models/User';
import { Router } from '@angular/router';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('imageInput', { static: true}) imageInput;  
 
  options =["Apple", "Acer" , "Asus" ,"Beko" ,"Bosh" ,"Brandt", "Dell" ,"Haier","Huawei", " HP" , "Infinix" ,"LG" ,"Lenovo","MSI" , "Nokia" ,"Samsung",
   "Xiaomi"]
  filteredOptions: any;

  isDisabled=true ;
  selectedFile: ImageSnippet |any ;
  Reference:string ='';
  image:string='';
  userDetails ;
  model : any={}; 
  userId:string ;
  isSuccessful = false;
  inspectionTypesList:any=[];

  showMe:boolean=false ;

  loading = false;
  errorMessage = '';
  formGroup : FormGroup |any;
  addProduct :FormGroup
    
    constructor(private productapi:ProductApiService , private fb: FormBuilder ,
      private userService: LoginVendeurService,private router:Router,
      private sanitizer: DomSanitizer) { 
      }


    public getSantizeUrl(url : string) {
      return this.sanitizer.bypassSecurityTrustUrl(url);
  }
    
    public getRepos() {
      this.loading = true;
      this.errorMessage = '';
      this.productapi.getInspectionList(this.formGroup.value.Reference)
          .subscribe((response) => {this.inspectionTypesList = response;},
                     (error) => {
                         this.errorMessage = error.message; this.loading = false; 
                      },
                      () => {this.loading = false;})
  
  }

  testevent(){
    if((this.formGroup.value.reference_prod != '')&& (this.formGroup.value.sous_famille_prod != '')&&(this.formGroup.value.Brand  != '') && (this.formGroup.value.quantity  != '')&& (this.formGroup.value.description_prod != '')) {
      this.showMe =!this.showMe ;
      this.getRepos() ;
  
  }
}
  getUserDetails(){
  this.userService.getUser().subscribe(
    res => {
      this.userDetails = res;
      this.userId=this.userDetails.id;
    },
    err => {
      console.log(err);
    },
  );
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }
  
  initForm(){
    this.formGroup = this.fb.group({
      Reference: ['',[Validators.required]] ,
      sous_famille_prod:['',[Validators.required]],
      Brand:['',[Validators.required]],
      quantity:['',[Validators.required]],
      description_prod:['',[Validators.required]],
      prix_prod: ['',[Validators.required]],

    })

    this.formGroup.get('sous_famille_prod').valueChanges ;
    this.formGroup.get('Brand').valueChanges.subscribe((response: any) => {
      console.log('data is ', response);
      this.filterData(response);
    })
  }

  onSubmit(){
 
    let formData = new FormData();  
       
    formData.append('Reference', this.formGroup.value.Reference);
    formData.append('sous_famille_prod', this.formGroup.value.sous_famille_prod);
    formData.append('Brand', this.formGroup.value.Brand);
    formData.append('quantity', this.formGroup.value.quantity);
    formData.append('description_prod', this.formGroup.value.description_prod);
    formData.append('prix_prod', this.formGroup.value.prix_prod);  
    formData.append('image_prod', this.imageInput.nativeElement.files[0]);
    formData.append('id', this.userDetails.id);
    this.userService.AddFileDetails(formData).subscribe(result => {});  
    this.isSuccessful = true ;
  }

  

  filterData(enteredData: string){
    this.filteredOptions = this.options.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }

    ngOnInit(): void {
      this.initForm() ;
      this.userService.getUser().subscribe(
        res => {
          this.userDetails = res;
          this.userId=this.userDetails.id;
        },
        err => {
          console.log(err);
        },
      );
      //this.getUserDetails()
      
    }
    onLogout() {
      localStorage.removeItem('token');
      this.router.navigate(['/accueil']);
    }

}
