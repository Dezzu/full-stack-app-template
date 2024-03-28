import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../service/auth.service";
import {catchError, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private auth: AuthService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const token = this.auth.getToken()
        if(token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if(error.status == 403) {
                    this.auth.logout();
                    this.router.navigate(["/auth/login"])
                }
                return throwError(() => error);
            })
        );
    }
}
