import { ProduitOrder } from "./ProduitOrder";

export class Commande {
 /*    name: string;
    lastName: string;
    company: string;
    country:string;
    street: string;
    city: string;
    zip: number;
    phone: string;
    email: string;
    produits : ProduitOrder[];
    total:number; */

   constructor (
    public name: string,
    public  lastName: string,
    public  company: string,
    public  country:string,
    public  street: string,
    public  city: string,
    public  zip: string,
    public  phone: string,
    public  email: string,
    public  produits : ProduitOrder[],
    public  total:number,
    public  payment:string) {}
    
}
