import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err) {
          if (err.status === 400) {
            if (err.error.errors) {
              /// validation error
              throw err.error;
            } else {
              /// case generic bad request error
              // this.toastr.error(err.error.message, err.error.statusCode);
            }
          }

          if (err.status === 404) {
            this.router.navigateByUrl('/test-error/not-found');
          }
          if (err.status === 500) {
            let navigationExtras: NavigationExtras = {
              state: { error: err.error },
            };
            this.router.navigateByUrl(
              '/test-error/server-error',
              navigationExtras
            );
          }
        }

        return throwError(err);
      })
    );
  }
}
