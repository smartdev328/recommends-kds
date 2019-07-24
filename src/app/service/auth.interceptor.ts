import { Injectable, ErrorHandler } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
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
}
