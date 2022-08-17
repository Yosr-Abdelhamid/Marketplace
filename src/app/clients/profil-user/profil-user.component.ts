import { Component, OnInit } from '@angular/core';
import { AdminClientService } from '../admin-client.service';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { EditProfileClientComponent } from '../edit-profile-client/edit-profile-client.component';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent implements OnInit {
  profile ;
  constructor(private userService :AdminClientService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getClient().subscribe( res => {
      this.profile = res ;
      console.log(this.profile.nom)
    })
  }
  edit(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EditProfileClientComponent,dialogConfig);
  }
}
