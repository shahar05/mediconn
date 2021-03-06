import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


    

    constructor(public authService: AuthService , private router : Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.authService.getToken()}`
            }
        });
        return next.handle(request).pipe(
            tap(()=>{

                this.authService.setIsAuth(true);

            } ,(err : HttpErrorResponse)=>{
                console.log(err);
                if(err.status === 401){
                    this.authService.setIsAuth(false);
                   // this.router.navigate(["/expired"]);
                }
                    
            })
        );
    }
}
