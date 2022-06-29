import { ProduitModel } from "./ProduitModel";

export class ProductResult{

    reference: string;
    quantity: number  ;
    prix_prod: number;
    image_prod: string;
    organization:string;
    constructor(reference : string , quantity : number ,
        prix_prod :number , image_prod : string , organization : string) {
            this.reference = reference ;
            this.quantity =quantity ;
            this.prix_prod =prix_prod ;
            this.image_prod = image_prod ;
            this.organization = organization ;
        }
}
