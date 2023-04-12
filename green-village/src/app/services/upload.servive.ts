import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, switchMap } from "rxjs";
import { ResponsePhoto } from "../interface/reponsePhoto.interface";
import { Produit } from "../models/produit.model";
import { produitsService } from "./produits.service";
import { PipeTransform } from '@angular/core';
import { Photo } from "../models/photo.model";


@Injectable({
    providedIn: 'root'
})
export class uploadService implements ResponsePhoto, PipeTransform{
    
    
    constructor(private httpClient: HttpClient,
                private produitService: produitsService,
                
                ){}

    nom!: string;
    lastProduit$!: Observable<Produit>;
    idLastProduit!: number;
    demotedPicture!: Photo;


    public uploadFile(file: File): Observable<ResponsePhoto> {
        let formParams = new FormData();
        formParams.append('file', file);
        return this.httpClient.post<any>(`http://127.0.0.1:8000/api/post_image`, formParams);
    }

    public uploadProduit(formValue: {refProduit: string, shortLibel: string, longLibel: string, idCategorie: number, prixHt: number, slug: string}): Observable<Produit>{
        return this.produitService.getAllProduit().pipe(
            map(produits => [...produits].sort((a,b)=>a.id - b.id)),
            map(sortedProduits => sortedProduits[sortedProduits.length - 1]),
            map(previousProduits => ({
                ...formValue,
                slug: this.transform(formValue.shortLibel),
            })),
            switchMap(newProduit => this.httpClient.post<Produit>('http://127.0.0.1:8000/api/produits', newProduit))
        );
    }

    public  uploadPhoto(images: string, idProduit: number): Observable<Photo>{
        return this.produitService.getAllProduit().pipe(
            map(produits => [...produits].sort((a,b)=>a.id - b.id)),
            map(sortedProduits => sortedProduits[sortedProduits.length -1]),
            map(previousProduit => ({
                refProduit: "/api/produits/" + idProduit,
                src: 'assets/media/produits/' + images,
                majorPicture: false,
            })),
            switchMap(newPhoto => this.httpClient.post<Photo>('http://127.0.0.1:8000/api/photos', newPhoto))
        )
    }
    public  uploadPhotoPrincipale(image: string, idProduit: number): Observable<Photo>{
        return this.produitService.getAllProduit().pipe(
            map(produits => [...produits].sort((a,b)=>a.id - b.id)),
            map(sortedProduits => sortedProduits[sortedProduits.length -1]),
            map(previousProduit => ({
                refProduit: "/api/produits/" + idProduit,
                src: 'assets/media/produits/' + image,
                majorPicture: true,
            })),
            switchMap(newPhoto => this.httpClient.post<Photo>('http://127.0.0.1:8000/api/photos', newPhoto))
        )
    }

    public deletePicture(idPicture: number): Observable<Photo>{
        return this.httpClient.delete<Photo>(`http://127.0.0.1:8000/api/photos/${idPicture}`);
    }
    
    public PromotedPicture(idPicture: number, majorPicId: number){
        const majorOff = { majorPicture: false };
        const majorOn = { majorPicture: true };
        this.httpClient.put(`http://127.0.0.1:8000/api/photos/${majorPicId}`, majorOff).subscribe();
        this.httpClient.put(`http://127.0.0.1:8000/api/photos/${idPicture}`, majorOn).subscribe();
    }

    public modifyProduit(idProduit: number, formValue: {refProduit: string, shortLibel: string, longLibel: string, idCategorie: string, prixHt: number}){
        const redProduit = { refProduit: formValue.refProduit };
        this.httpClient.put(`http://127.0.0.1:8000/api/produits/${idProduit}`, redProduit).subscribe();
        const shortLibel = { shortLibel: formValue.shortLibel };
        this.httpClient.put(`http://127.0.0.1:8000/api/produits/${idProduit}`, shortLibel).subscribe();
        const slug = { slug: this.transform(formValue.shortLibel) };
        this.httpClient.put(`http://127.0.0.1:8000/api/produits/${idProduit}`, slug).subscribe();
        const longLibel = { longLibel: formValue.longLibel };
        this.httpClient.put(`http://127.0.0.1:8000/api/produits/${idProduit}`, longLibel).subscribe();
        const idCategorie = { idCategorie: formValue.idCategorie };
        this.httpClient.put(`http://127.0.0.1:8000/api/produits/${idProduit}`, idCategorie).subscribe();
        const prixHt = { prixHt: formValue.prixHt };
        this.httpClient.put(`http://127.0.0.1:8000/api/produits/${idProduit}`, prixHt).subscribe();
    }

    public deleteProduit(idProduit: number){
        this.httpClient.delete(`http://127.0.0.1:8000/api/produits/${idProduit}`).subscribe();
    }


    transform(input: string): string {
        return input.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of tex
    }
}