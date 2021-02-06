import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError(err => {
          if (err) {
            if (err.status === 400) {
              if (err.error.errors) {
                throw err.error;
              } else {
                this.toastr.error(err.error.message, err.error.statusCode);
              }
            }
            if (err.status === 401) {
              this.toastr.error(err.error.message, err.error.statusCode);
            }
            if (err.status === 404) {
              this.router.navigateByUrl('/not-found');
            }
            if (err.status === 500) {
              const navigationExtras: NavigationExtras = { state: { error: err.error } };
              this.router.navigateByUrl('/server-error', navigationExtras);
            }

          }
          return throwError(err);
        })
      );
  }
}
