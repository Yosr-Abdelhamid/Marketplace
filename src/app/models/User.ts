export class User {
    id : string ="";
    nom: string ="";
    prenom: string ="";
    email: string ="";
    adresse: string ="";
    num_Telephone: string ="";
    zipCode:string="";
    organization: string ="";
    isActived:boolean ;
    isNotBlocked:boolean;
    constructor(id: string, nom: string, prenom: string, email: string, adresse: string , num_Telephone :string, zipCode:string, organization:string , isActived:boolean , isNotBlocked:boolean) {
        this.id = id ;
        this.nom =nom ;
        this.prenom =prenom ;
        this.email =email ;
        this.adresse =adresse;
        this.num_Telephone=num_Telephone ;
        this.zipCode= zipCode;
        this.organization =organization;
        this.isActived =isActived;
        this.isNotBlocked = isNotBlocked;

}

}