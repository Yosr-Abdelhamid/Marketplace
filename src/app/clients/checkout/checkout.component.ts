import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { reference } from '@popperjs/core';
import { Commande } from 'src/app/models/Commande';
import { Product } from 'src/app/models/Product';
import { ProduitOrder } from 'src/app/models/ProduitOrder';
import { NotificationService } from 'src/app/notification.service';
import { AdminClientService } from '../admin-client.service';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  favoriteSeason: string ;
  items$ ;
  profile;
  allTotal:number ;
  productAddedTocart:Product[];
  isEditable = false;
  ref="test" ;
  prix = 15 ;
  tot =5;
  list = [] ;
  liste ={};
 ; 

  formGroup = this._formBuilder.group({
    //name: ['', Validators.required],
    //lastName: ['', Validators.required],
    country: ['', Validators.required],
    //street: ['', Validators.required],
    city: ['', Validators.required],
    //zip: ['', Validators.required],
    //phone: ['', Validators.required],
    //email: ['', Validators.required],
  });
 

  secondFormGroup = this._formBuilder.group({
    checked: ['', Validators.required],
  });

  form =  this._formBuilder.group({
    payment: ['', Validators.required],
  });
  //pro: ProduitOrder = JSON.parse({reference: '' , prix: this.prix}) ;

  selectedRadio = 'own'; //default value

  constructor(private cartService : CartService , private _formBuilder:FormBuilder , private notifyService: NotificationService,
    private service : AdminClientService) { }

  ngOnInit(): void {
    this.service.getClient().subscribe( res => {
      this.profile = res ;
      console.log(this.profile.nom)
    }) ;

    this.items$ = this.cartService.items$;
    this.cartService.items$.subscribe(result  => {
       this.productAddedTocart = result;
       this.calculteAllTotal(this.productAddedTocart);

    /*    this.productAddedTocart.forEach((item, index) => {

       this.list.push(item.reference , item.prix_prod);
       console.log(this.list.push(item.reference , item.prix_prod))
      }) */})
      
    console.log(this.formGroup.value.name)

  
}
  calculteAllTotal(allItems:Product[])
  {
    let total=0;
    for (let i in allItems) {
      total= total+(allItems[i].quantityP*allItems[i].prix_prod);
   }
   this.allTotal=total;
  
}

radioChange(e){
  console.log(this.selectedRadio)
}
    
sendOrder(){
  var commande = <Commande>{} ;
  var prod = <ProduitOrder>{}; 

  this.cartService.items$.subscribe(result  => {
    this.productAddedTocart = result;
    for (let i = 0 ; i <this.productAddedTocart.length ; i++){
        prod.reference = this.productAddedTocart[i].reference ,
        prod.prix = this.productAddedTocart[i].prix_prod ,
        prod.organization= this.productAddedTocart[i].organization,
        console.log(this.productAddedTocart[i].organization)
        this.liste = {"reference" : prod.reference , "prix" : prod.prix , "organization" : prod.organization}
        this.list.push(this.liste)
        console.log(this.list)
    }
  
 /*  commande.produits = [{"reference" : this.productAddedTocart[0].reference , "prix" : this.productAddedTocart[0].prix_prod},
  {"reference" : this.productAddedTocart[1].reference , "prix" : this.productAddedTocart[1].prix_prod},
  {"reference" : this.productAddedTocart[2].reference , "prix" : this.productAddedTocart[2].prix_prod}],  */
    commande.name  = (<HTMLInputElement>document.getElementById("name")).value ,
    commande.lastName = (<HTMLInputElement>document.getElementById("prenom")).value,
    commande.country = this.formGroup.value.country,
    commande.street = (<HTMLInputElement>document.getElementById("adresse")).value,
    commande.city = this.formGroup.value.city,
    commande.zip = (<HTMLInputElement>document.getElementById("zipCode")).value,
    commande.phone = (<HTMLInputElement>document.getElementById("phone")).value,
    commande.email = (<HTMLInputElement>document.getElementById("email")).value,
    commande.total = this.allTotal+7 ,
    commande.produits= this.list
    commande.payment = this.selectedRadio ,
    
  this.service.AddOrder(commande).subscribe(result => {
    this.cartService.removeAllProductFromCart() ;
    this.items$ = this.cartService.items$;
    //this.showToasterSuccess() ;
  }) ;
  }); }

  showToasterSuccess() {
  this.notifyService.showSuccess(
    'Product Added !!' );
    }

 /*  let formData = new FormData();         
  formData.append('name', this.formGroup.value.name);
  formData.append('lastName', this.formGroup.value.lastName);
  formData.append('company', this.formGroup.value.company);
  formData.append('country', this.formGroup.value.country);
  formData.append('street', this.formGroup.value.street);
  formData.append('city', this.formGroup.value.city);
  formData.append('zip', this.formGroup.value.zip);  
  formData.append('phone', this.formGroup.value.phone);
  formData.append('email', this.formGroup.value.email);

  for (let i = 0; i < this.items$.length; i++) {
    formData.append('produits[i].reference', this.items$.reference);
    formData.append('produits[i].prix', this.items$.prix);
  }
  formData.append('total', this.formGroup.value.total); */

   



}
