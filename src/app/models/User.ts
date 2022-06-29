export class User {
    id : string ="";
    nom: string ="";
    prenom: string ="";
    email: string ="";
    adresse: string ="";
    num_Telephone: string ="";
    zipCode:string="";
    organization: string ="";
    constructor(id: string, nom: string, prenom: string, email: string, adresse: string , num_Telephone :string, zipCode:string, organization:string) {
        this.id = id ;
        this.nom =nom ;
        this.prenom =prenom ;
        this.email =email ;
        this.adresse =adresse;
        this.num_Telephone=num_Telephone ;
        this.zipCode= zipCode;
        this.organization =organization

}

}