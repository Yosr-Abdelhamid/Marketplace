import { Component, OnInit } from '@angular/core';
import { AdminClientService } from '../admin-client.service';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent implements OnInit {
  profile ;
  constructor(private userService :AdminClientService) { }

  ngOnInit(): void {
    this.userService.getClient().subscribe( res => {
      this.profile = res ;
      console.log(this.profile.nom)
    })
  }

}
