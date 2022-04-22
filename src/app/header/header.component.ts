import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { ProductApiService } from '../product-api.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public dialog: MatDialog, public productapi:ProductApiService) { }

  ngOnInit(): void {
  }


openDialog(){
  const dialogRef = this.dialog.open(LoginComponent, {
    id: 'dialog1'
  });
  console.log(dialogRef);
}
}
