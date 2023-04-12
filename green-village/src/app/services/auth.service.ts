import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ReponseToken } from "../interface/reponseToken.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class AuthService{

    constructor(private httpClient: HttpClient,
                ) {}

    private Token!: string;

    getToken(email: string, password: string):Observable<ReponseToken>{
        return this.httpClient.post('http://127.0.0.1:800/auth');
    }
}