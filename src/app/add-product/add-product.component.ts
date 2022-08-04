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
import { AlertService } from '../alert/alert.service';
import { MatStepper } from '@angular/material/stepper';
import { AdminClientService } from '../clients/admin-client.service';
import { formatDate } from '@angular/common';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  @ViewChild('imageInput', { static: true}) imageInput;  
 
  options =["Apple", "Acer" , "Asus" ,"Beko" ,"Biolux" ,"Bosh" ,"Brandt", "Dell" ,"Haier","Huawei", " HP" , "Infinix" ,"LG" ,"Lenovo","EPSON" ,"MONBLANC" ,"NewStar" ,"MSI" ,"Midea" , "Nokia" ,"Samsung", "TCL" , "Gree",
   "Xiaomi"]
  filteredOptions: any;
  id_por ;
  isLinear = false;
  firstFormGroup: FormGroup;
  PcFormGroup: FormGroup;
  SmartphoneFormGroup: FormGroup;
  step = 1;
  isDisabled=true ; num ;
  selectedFile: ImageSnippet |any ;
  Reference:string ='';
  image:string='';
  userDetails ; myDate ;
  model : any={}; 
  getCom ;
  userId:string ;
  comision ;
  inspectionTypesList:any=[];
  pcSelected:boolean=false;
  phoneSelected:boolean=false ;

  showMe:boolean=false ;

  loading = false;
  errorMessage = ''; streetaddress;
  formGroup : FormGroup |any;
  addDetailsformGroup : FormGroup |any;
  addProduct :FormGroup
  commissions ;
  solde ; getSolde ;
  Sold;
    
    constructor(private productapi:ProductApiService , private fb: FormBuilder ,private formBuilder: FormBuilder,
      private userService: LoginVendeurService,private router:Router,private alertService: AlertService , private service : AdminClientService,
      private sanitizer: DomSanitizer ,private _formBuilder: FormBuilder ) { 
      }


    public getSantizeUrl(url : string) {
      return this.sanitizer.bypassSecurityTrustUrl(url);
  }
    
    public getSimilaireProduct() {
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
      this.getSimilaireProduct() ;
  
  }
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
      this.filterData(response);
    })
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
          this.userService.GetPortfeuille(this.userDetails.id).subscribe(
            res => {
              this.solde = res ;
              this.getSolde = this.solde.sold ;
            }
          );
          this.userId=this.userDetails.id;
        },
        err => {
          console.log(err);
        },
      );
      }



      getCommission(value){
      console.log(value);
      this.service.GetCommissionByCategorie(value).subscribe(
        res => {
          this.commissions =  res ;
         this.streetaddress = this.commissions.commission.split('%')[0];
        }
      )
    }
      //this.getUserDetails(

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
      
    this.comision = (this.formGroup.value.prix_prod*this.streetaddress)/100 ;

    this.num = this.comision.toFixed(2)
    console.log(this.num);

    if (this.getSolde > this.num){
      this.userService.AddFileDetails(formData).subscribe(result => {
        this.alertService.success('Product Added with success !');
        this.updateSold();
        this.ngOnInit();
          },

          err => {
          if (err.status == 400)
            this.alertService.error('Enter a valid informations please!');
          else
            console.log(err);
          })

    } else if (this.getSolde < this.num) {
      this.alertService.error('Lack of Sold ! Please recharge your Wallet to continue selling!');
    }
  }

    updateSold() {
      let formData = new FormData();
      this.Sold = this.getSolde - this.num;           
      formData.append('Id_portf', this.solde.id_portf);
      formData.append('Sold', this.Sold);
      this.userService.updatePortfeuille(formData).subscribe(res => {}) ;

    }
            
    reset(){
      this.formGroup.reset() ;
    }

    onLogout() {
      localStorage.removeItem('userInfo');
      this.router.navigate(['/accueil']);
    }

    

}

