import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { AuthService } from "../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.auth.getToken()
        }
      })
    }
    return next.handle(req).pipe(
      catchError(
        (err: HttpErrorResponse) => {
          return this.handleAuthError(err);
      })
    );
  }

  private handleAuthError(err: HttpErrorResponse): Observable<HttpEvent<any>>{
    if (err.status === 401) {
      this.router.navigate(['/login'], {
        queryParams: {
          sessionExpired: true
        }
      });
    }
    return throwError(err);
  }
}
