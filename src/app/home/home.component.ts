import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductApiService } from '../product-api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public nameForm:FormGroup;

  isDisabled=true ;
  //inspectionList$!:Observable<any[]>;

  inspectionTypesList:any=[];
  SimilaireProductList:any=[];
  ProduitS:string="";
  sous_famille:string="";
  Reference: string = "";
  Magasin: string = "";
  Prix: string = "";
  description?:string;

  loading = false;
    errorMessage = '';
    customOptions: OwlOptions = {
      loop: true,
      items:4,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      navSpeed: 700,
      navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
      center:true,
      margin:30,
      nav: true
    }
  
    constructor(private productapi:ProductApiService , private formBuilder: FormBuilder ,private sanitizer: DomSanitizer) { 
      this.nameForm = this.formBuilder.group({
        Reference: '' , sous_famille:'' ,Magasin:''
      });
      
    }
    public getSantizeUrl(url : string) {
      return this.sanitizer.bypassSecurityTrustUrl(url);
  }
    
    public getRepos() {
      this.loading = true;
      this.errorMessage = '';
      this.productapi.getInspectionList(this.Reference)
          .subscribe((response) => {this.inspectionTypesList = response;},
                     (error) => {
                         this.errorMessage = error.message; this.loading = false; 
                      },
                      () => {this.loading = false;})
  
  }
  public getSimialire() {
    this.loading = true;
    this.errorMessage = '';
    this.productapi.getSimilaireList(this.Reference, this.sous_famille)
        .subscribe((response) => {this.SimilaireProductList = response;},
                   (error) => {
                       this.errorMessage = error.message; this.loading = false; 
                    },
                    () => {this.loading = false;})

}
  
  testevent(){
  
    this.Reference=this.nameForm.get('Reference')?.value;
    this.sous_famille=this.nameForm.get('sous_famille')?.value;
    this.Magasin=this.nameForm.get('Magasin')?.value;
  
  
    if((this.Reference != '')&& (this.sous_famille != '')&&(this.Magasin  != '')) {
      this.isDisabled = false ;
      this.getRepos() ;
      this.getSimialire();
      this.ProduitS='Produits Similaires'
  
    }
  }
    ngOnInit(): void {
      
    }

}
