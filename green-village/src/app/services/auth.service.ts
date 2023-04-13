import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { ReponseToken } from "../interface/reponseToken.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";


@Injectable({
    providedIn: "root"
})
export class AuthService{
    
    constructor(private httpClient: HttpClient,
                private router: Router) {}
                
    authentification(formInfo: Object) {
        this.httpClient.post<any>('http://127.0.0.1:8000/auth', formInfo).subscribe((response: ReponseToken) => {
            localStorage.setItem('token', response.token)
            localStorage.setItem('refreshToken', response.refresh_token)
            alert('Vous êtes connecté')
        });
    }
      
    refreshToken(data: {refresh_token: string}): Observable<ReponseToken>{
        const headers = new HttpHeaders().set('X-Skip-Interceptor', `true`);
        const options = { headers: headers }
        return this.httpClient.post<ReponseToken>('http://127.0.0.1:8000/api/token/refresh', data, options)
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        // Do any other cleanup, like resetting the user state
      }
    
    token = localStorage.getItem('token');
    
    
    getToken(){
        return this.token;
    }

      clearLocalStorage() {
        localStorage.clear();
      }   
}