import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/alert/alert.service';
import { EditProfileComponent } from 'src/app/edit-profile/edit-profile.component';
import { LoginVendeurService } from 'src/app/login-vendeur.service';
import { AdminClientService } from '../admin-client.service';

@Component({
  selector: 'app-edit-profile-client',
  templateUrl: './edit-profile-client.component.html',
  styleUrls: ['./edit-profile-client.component.css']
})
export class EditProfileClientComponent implements OnInit {
profile ;
form:any ;
  constructor(private userService:AdminClientService ,public dialogRef: MatDialogRef<EditProfileComponent>,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.userService.getClient().subscribe( res => {
      this.profile = res ;})
  }
  onSubmit() {
    let formData = new FormData();  
    formData.append('id', this.profile.id);
    formData.append('Nom' , (<HTMLInputElement>document.getElementById("Nom")).value) ;
    formData.append("Prenom", (<HTMLInputElement>document.getElementById("Prenom")).value);
    formData.append("Email" , (<HTMLInputElement>document.getElementById("Email")).value);
    formData.append("Adresse" ,(<HTMLInputElement>document.getElementById("Adresse")).value);
    formData.append("Num_Telephone" , (<HTMLInputElement>document.getElementById("Num_Telephone")).value);
    formData.append("ZipCode" , (<HTMLInputElement>document.getElementById("ZipCode")).value);
    this.userService.UpdateProfile(formData).subscribe(result => {
      this.alertService.success('Informations are updated with success !')
    }); 
    
  }

  onClose() {

    this.dialogRef.close();
  }
}
