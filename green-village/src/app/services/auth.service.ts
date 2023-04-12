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

    private token!: string;
    private refresh_token!: string;

    authentification(formInfo: Object) {
        this.httpClient.post<any>('http://127.0.0.1:8000/auth', formInfo).subscribe((response: ReponseToken) => {
            this.token = response.token,
            this.refresh_token = response.refresh_token
            console.log(this.token);
            console.log(this.refresh_token);
        })
    }

    getToken(){
        return this.token;
    }
}