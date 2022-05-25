import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { LoginVendeurService } from '../login-vendeur.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @ViewChild('imageInput', { static: true}) imageInput; 

  userDetails ;
  formGroup:FormGroup ;
  selectedFile: ImageSnippet |any ;
  onSelected;
  item:any ;
  selectedProduct: [];


  constructor(private userService:LoginVendeurService , private router:Router ,
    private route:ActivatedRoute , private fb: FormBuilder , private alertService:AlertService ) { }

  ngOnInit(): void {

    this.userService.getUser().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    );

    this.route.queryParams.subscribe((params)=> {
      this.item = JSON.parse(atob(params['item'])) ;

    })

  
  }
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }

  onLogout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/accueil']);
  }

  onSubmit(event: any)
  {
    let formData = new FormData();  
    
    formData.append('id_prod', this.item.id_prod);
    formData.append('Reference', (<HTMLInputElement>document.getElementById("Reference")).value);
    formData.append('sous_famille_prod', (<HTMLInputElement>document.getElementById("sous_famille_prod")).value);
    formData.append('Brand', (<HTMLInputElement>document.getElementById("Brand")).value);
    formData.append('quantity', (<HTMLInputElement>document.getElementById("quantity")).value);
    formData.append('description_prod', (<HTMLInputElement>document.getElementById("description_prod")).value);
    formData.append('prix_prod', (<HTMLInputElement>document.getElementById("prix_prod")).value);  
    formData.append('image_prod', this.imageInput.nativeElement.files[0]);
    this.userService.updateProduit(formData).subscribe(result => {
      this.alertService.success('Product updated with success !');
    });  
  }
  reset(){

  }
}
