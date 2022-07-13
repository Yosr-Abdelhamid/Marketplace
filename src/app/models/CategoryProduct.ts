export class CategoryProduct {
    reference: string;
    quantity: number ;
    description_prod:string;
    brand:string;
    prix_prod: number;
    image_prod: string;
    organization:string;
    constructor(reference : string , quantity : number ,description_prod:string,
        brand:string, prix_prod :number , image_prod : string , organization : string) {
            this.reference = reference ;
            this.quantity =quantity ;
            this.description_prod =description_prod ;
            this.brand=brand ;
            this.prix_prod =prix_prod ;
            this.image_prod = image_prod ;
            this.organization = organization ;
        }

}