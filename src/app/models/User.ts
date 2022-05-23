export class User {
    id : string ="";
    nom: string ="";
    prenom: string ="";
    email: string ="";
    adresse: string ="";
    num_Telephone: string ="";
    constructor(id: string, nom: string, prenom: string, email: string, adresse: string , num_Telephone :string) {
        this.id = id ;
        this.nom =nom ;
        this.prenom =prenom ;
        this.email =email ;
        this.adresse =adresse;
        this.num_Telephone=num_Telephone ;

}
}