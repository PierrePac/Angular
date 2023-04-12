import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class AuthService{
    private Token!: string;

    getToken():string{
        return this.Token;
    }
}