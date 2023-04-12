export class Produit {

    constructor(public id: number,
                public refProduit: string, 
                public shortLibel: string, 
                public longLibel: string, 
                public idCategorie: number,
                public photo: string[],
                public prixHt: number,
                public slug: string,
                ){

    }
}