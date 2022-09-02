import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { LoginVendeurService } from '../login-vendeur.service';


@Component({
  selector: 'app-dashboard-vendeur',
  templateUrl: './dashboard-vendeur.component.html',
  styleUrls: ['./dashboard-vendeur.component.css']
})
export class DashboardVendeurComponent  implements OnInit {
  userDetails ;
  isUploading: boolean = false;
  file: File;
  infoMessage: any;
  solde ;
  imageUrl: string | ArrayBuffer;
  image: string | ArrayBuffer ="./assets/images/add_log.png";
  

  constructor(private userService:LoginVendeurService , private router:Router ,
    private alertService : AlertService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      res => {
        this.userDetails = res;
        if (this.userDetails.image_org == null) {
            this.imageUrl="./assets/images/add_log.png" 
        }else{
          this.imageUrl ='data:image/png;base64,'+this.userDetails.image_org ; 
        }
        this.userService.GetPortfeuille(this.userDetails.id).subscribe(
          res => {
            this.solde = res ;
          }
        )
      },
    );
  }

  onChange(file: File) {
    if (file) {
      this.file = file;
      

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {
        this.imageUrl = reader.result;
        let formData = new FormData();
        formData.append('id', this.userDetails.id);
        formData.append('image_org', this.file); 
        this.userService.AddImageOrg(formData).subscribe(result => {
        
      });
   
    }}
  }





  edit(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EditProfileComponent,dialogConfig);
  }

  onLogout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/accueil']);
  }

}