import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, retry, switchMap } from 'rxjs/operators';
import { ReponseToken } from '../interface/reponseToken.interface';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService,
        private httpClient: HttpClient,
        private router: Router
    ) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('X-Skip-Interceptor') === 'true') {
            return next.handle(req);
        } else {
            const token = localStorage.getItem('token');
            if (token) {
                const headers = new HttpHeaders()
                    .set('Authorization', `Bearer ${token}`);
                const modifiedReq = req.clone({ headers });
                return next.handle(modifiedReq).pipe(
                    catchError((err: HttpErrorResponse) => {
                        if (err.status === 401 && token) {
                            const refreshToken = localStorage.getItem('refreshToken') ?? '';
                            const data = { refresh_token: refreshToken };
                            return this.authService.refreshToken(data).pipe(
                                switchMap((response: ReponseToken) => {
                                    localStorage.removeItem('token');
                                    localStorage.setItem('token', response.token);
                                    const headers = new HttpHeaders().set('Authorization', `Bearer ${response.token}`);
                                    req = req.clone({ headers });
                                    return next.handle(req);
                                }),
                                catchError((error: any) => {
                                    this.authService.logout();
                                    return throwError(error);
                                }),
                                retry(1)
                            );
                        } else {
                            this.router.navigateByUrl(``);
                            return throwError(err);
                        }
                    })
                );
            }
            return next.handle(req);
        }
    }
}