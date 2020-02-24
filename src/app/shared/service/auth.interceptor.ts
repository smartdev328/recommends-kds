import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { mergeMap, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import {

  HttpResponse,
  HttpErrorResponse
 } from '@angular/common/http';
 import { retry } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    /*
    constructor(
        private authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.token.value;
        return next.handle(this.addToken(request, token));
    }


    addToken(request: HttpRequest<any>, token: any): HttpRequest<any> {
        return request.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
    }
    */
   constructor(private auth: AuthService, private user : UserService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.auth.getTokenSilently$().pipe(
      
      mergeMap(token => {
        if (!req.url.startsWith("https://api.airtable.com")) {
          const tokenReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
          });
          this.user.sendToken(token);
          return next.handle(tokenReq);
        } else {
          return next.handle(req);
        }
      }),
      // catchError(err => throwError(err)
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error : ${error.error}\nMessage: ${error}`;
        }
        //console.log(req);
        return throwError(errorMessage);
      })
      );
    // );
  }
}
