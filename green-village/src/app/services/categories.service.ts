import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Categorie } from "../models/categorie.model";

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    constructor (private http: HttpClient) {}



    categories: Categorie[] = [
        
    ]

    getAllCategories(): Observable<Categorie[]> {
        return this.http.get<Categorie[]>('http://pierrep.amorce.org/api/categories');
    }

    getAllSousCategories(): Observable<Categorie[]> {
        return this.http.get<Categorie[]>('http://pierrep.amorce.org/api/categories?exists%5Bsous_cat%5D=true');
    }

    getCategorieById(categorieId: number): Observable<Categorie[]> {
        return this.http.get<Categorie[]>(`http://pierrep.amorce.org/api/categories/${categorieId}`);
    }

    getSousCategorie(categorieId: number): Observable<Categorie[]>{
        return this.http.get<Categorie[]>(`http://pierrep.amorce.org/api/categories?sous_cat%5B%5D=${categorieId}`);
    }
}