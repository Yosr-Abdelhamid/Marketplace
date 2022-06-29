export class Acheteur{
Id : string ="";
Nom: string ="";
Prenom: string ="";
Email: string ="";
Adresse: string ="";
Num_Telephone: string ="";
ZipCode :string="";
Role: string="";
MotDePasse: string ="";
ResetToken: string ="";
VerificationToken: string ="";
PasswordReset: string ="";
token?:string ;
constructor(id: string, Nom: string, Prenom: string, Email: string, Adresse: string , Num_Telephone :string, Role: string, ZipCode:string) {
    this.Id = id ;
    this.Nom =Nom ;
    this.Prenom =Prenom ;
    this.Email =Email ;
    this.Adresse =Adresse;
    this.Num_Telephone=Num_Telephone ;
    this.Role = Role ;
    this.ZipCode =ZipCode;

}
}