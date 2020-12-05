import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from '../shared/loader.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private loaderService: LoaderService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers: any = {};

    request = request.clone({
      setHeaders: headers
    });

    return next.handle(request).pipe(
      tap(
        data => {
          if (data instanceof HttpResponse) {
            this.loaderService.loader.next(false);
          }
        },
        (err: any) => {
          this.loaderService.loader.next(false);
        }
      )
    );
  }
}
