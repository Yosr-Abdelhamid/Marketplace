export class RequestProduct {
    reference_prod : string ="";
    sous_famille_prod: string ="";
    Brand: string ="";
    quantity: string ="";
    description_prod: string ="";
    prix_prod: string ="";
   //image_prod:string="";
    //id:string="";

    constructor(reference_prod: string, sous_famille_prod: string, Brand: string, quantity: string,
         description_prod: string , prix_prod :string) {
        this.reference_prod=reference_prod ;
        this.sous_famille_prod=sous_famille_prod;
        this.Brand=Brand ;
        this.quantity=quantity ;
        this.description_prod=description_prod;
        this.prix_prod=prix_prod;
        //this.image_prod=image_prod;
        //this.id=id
}   

//public string  image_prod { get; set; }

}