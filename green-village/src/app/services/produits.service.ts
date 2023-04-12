import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable, map } from "rxjs";
import { Photo } from "../models/photo.model";
import { Produit } from "../models/produit.model";

@Injectable({
    providedIn: 'root'
})

export class produitsService {

    constructor(private http: HttpClient){}

    getAllProduitsByCategorie(categorieId: number): Observable<Produit[]> {
        return this.http.get<Produit[]>(`http://127.0.0.1:8000/api/produits?idCategorie=${categorieId}`);
    }
    getAllPictures(): Observable<Photo[]> {
        return this.http.get<Photo[]>('http://127.0.0.1:8000/api/photos');
    }

    getOneProduit(produitId: number): Observable<Produit> {
        return this.http.get<Produit>(`http://127.0.0.1:8000/api/produits/${produitId}`)
    }
   getMajorPictureOneProduit(produitId: number): Observable<Photo[]> {
        return this.http.get<Photo[]>(`http://127.0.0.1:8000/api/photos?refProduit=${produitId}&majorPicture=true`);
   }

   getOnePicture(pictureId: number): Observable<Photo>{
    return this.http.get<Photo>(`http://127.0.0.1:8000/api/photos/${pictureId}`)
   }

   getOtherPictureOfOneProduit(produitId: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`http://127.0.0.1:8000/api/photos?refProduit=${produitId}&majorPicture=false`)
   }

   getAllProduit(): Observable<Produit[]>{
    return this.http.get<Produit[]>('http://127.0.0.1:8000/api/produits');
   }

}