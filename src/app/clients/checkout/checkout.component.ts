import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  favoriteSeason: string ;
  items$ ;
  allTotal:number ;
  productAddedTocart:Product[];
  isEditable = false;

  formGroup = this._formBuilder.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    country: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    zip: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    checked: ['', Validators.required],
  });

  form =  this._formBuilder.group({
    payment: ['', Validators.required],
  });

  selectedRadio = 'own'; //default value

  constructor(private cartService : CartService , private _formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.items$ = this.cartService.items$;
    this.cartService.items$.subscribe(result  => {
       this.productAddedTocart = result;
       console.log(this.productAddedTocart);
       this.calculteAllTotal(this.productAddedTocart);
  }) ;

  console.log((this.form.get('payment')));
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
    
}
