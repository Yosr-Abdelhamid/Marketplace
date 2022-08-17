import { Commande } from "./Commande";

export class OrderList {
    id : string ="";
    nom: string ="";
    prenom: string ="";
    email: string ="";
    organization: string ="";
    orders: Commande ;
    constructor(id: string, nom: string, prenom: string, email: string,  organization:string , orders:Commande) {
        this.id = id ;
        this.nom =nom ;
        this.prenom =prenom ;
        this.email =email ;
        this.organization =organization;
        this.orders =orders;

}
}