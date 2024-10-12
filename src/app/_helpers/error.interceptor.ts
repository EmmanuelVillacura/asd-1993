import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from '../services/login.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService:LoginService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {              
                this.authService.logout();
                location.reload();
            }

            const error = err.error || err.statusText;
            console.log('Interceptando error');
            return throwError(error);
        }))
    }
}
