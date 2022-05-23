export class Vendeur {
    Id : string ="";
    Nom: string ="";
    Prenom: string ="";
    Email: string ="";
    Adresse: string ="";
    Num_Telephone: string ="";
    MotDePasse: string ="";
    ResetToken: string ="";
    VerificationToken: string ="";
    PasswordReset: string ="";
    token?:string ;
    constructor(id: string, Nom: string, Prenom: string, Email: string, Adresse: string , Num_Telephone :string) {
        this.Id = id ;
        this.Nom =Nom ;
        this.Prenom =Prenom ;
        this.Email =Email ;
        this.Adresse =Adresse;
        this.Num_Telephone=Num_Telephone ;

}
}