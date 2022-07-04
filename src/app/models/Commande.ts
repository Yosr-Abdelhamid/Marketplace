import { ProduitOrder } from "./ProduitOrder";

export class Commande {
   
    name: string='';
    lastName: string='';
    company: string='';
    street: string='';
    city: string='';
    zip: number;
    phone: string='';
    email: string='';
    produits: ProduitOrder[]
    total:number ;
}
