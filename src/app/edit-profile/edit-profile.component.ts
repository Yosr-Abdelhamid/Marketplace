import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  form:any ;
  selectedFile: ImageSnippet |any ;
  constructor( public dialogRef: MatDialogRef<EditProfileComponent>) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]),
      Nom: new FormControl('', [Validators.required]),
      Prenom:new FormControl('', [Validators.required]),
      Adresse:new FormControl('', [Validators.required]),
      Num_Telephone:new FormControl('', [Validators.required]),
      ZipCode:new FormControl('', [Validators.required]),
      Organization:new FormControl('', [Validators.required]),
      MotDePasse: new FormControl('', [Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )])
    });
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
  }
  onSubmit() {
  }

  onClose() {

    this.dialogRef.close();
  }

}
