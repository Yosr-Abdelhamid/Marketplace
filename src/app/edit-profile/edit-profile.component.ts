import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '../alert/alert.service';
import { LoginVendeurService } from '../login-vendeur.service';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @ViewChild('imageInput', { static: false}) imageInput; 

  form:any ;
  selectedFile: ImageSnippet |any ;
  userDetails ;
  constructor(private userService:LoginVendeurService ,public dialogRef: MatDialogRef<EditProfileComponent>,
    private alertService: AlertService) { }

  ngOnInit(): void {
    /* this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]),
      //Nom: new FormControl([Validators.required]),
      Prenom:new FormControl('', [Validators.required]),
      Adresse:new FormControl('', [Validators.required]),
      Num_Telephone:new FormControl('', [Validators.required]),
      ZipCode:new FormControl('', [Validators.required]),
      Organization:new FormControl('', [Validators.required]),
      MotDePasse: new FormControl('', [Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )])
    }); */
    this.userService.getUser().subscribe(
      res => {
        this.userDetails = res;
      }
    );

  }
  onClear() {
  
  }
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);
    let formData = new FormData(); 
    formData.append('id', this.userDetails.id);
    formData.append('image_org', this.imageInput.nativeElement.files[0]);
    this.userService.AddImageOrg(formData).subscribe(result => {
      this.alertService.success('Logo updated with success !');
    },
    err => {
    if (err.status == 400)
      this.alertService.error('Enter a valid informations please !');
    else
      console.log(err);
    });  
  }

  onSubmit() {
    let formData = new FormData();  
    formData.append('id', this.userDetails.id);
    formData.append('Nom' , (<HTMLInputElement>document.getElementById("Nom")).value) ;
    formData.append("Prenom", (<HTMLInputElement>document.getElementById("Prenom")).value);
    formData.append("Email" , (<HTMLInputElement>document.getElementById("Email")).value);
    formData.append("Adresse" ,(<HTMLInputElement>document.getElementById("Adresse")).value);
    formData.append("Num_Telephone" , (<HTMLInputElement>document.getElementById("Num_Telephone")).value);
    formData.append("ZipCode" , (<HTMLInputElement>document.getElementById("ZipCode")).value);
    formData.append("Organization" , (<HTMLInputElement>document.getElementById("Organization")).value);
    this.userService.UpdateProfile(formData).subscribe(result => {
      this.alertService.success('Product updated with success !')
    }); 
    
  }

  onClose() {

    this.dialogRef.close();
  }

}
