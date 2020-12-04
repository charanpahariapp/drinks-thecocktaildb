import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl: string;

  constructor(private http: HttpClient, private loaderService: LoaderService) {
    this.apiUrl = environment.BACKEND_BASE_URL + environment.API_KEY;
  }

  post<T>(url, data?, loader = true): Observable<any> {
    if (loader) {
      this.loaderService.loader.next(loader);
    }
    return this.http.post<any>(this.apiUrl + url, data);
  }

  put<T>(url, data, loader = true): Observable<any> {
    if (loader) {
      this.loaderService.loader.next(loader);
    }
    return this.http.put<any>(this.apiUrl + url, data);
  }

  patch<T>(url, data, loader = true): Observable<any> {
    if (loader) {
      this.loaderService.loader.next(loader);
    }
    return this.http.patch<any>(this.apiUrl + url, data);
  }

  get<T>(
    url,
    httpParams?: any,
    loader = true
  ): Observable<any> {
    if (loader) {
      this.loaderService.loader.next(loader);
    }

    for (const item in httpParams) {
      if (
        httpParams[item] === '' ||
        httpParams[item] === undefined ||
        httpParams[item] === null
      ) {
        delete httpParams[item];
      }
    }

    const header: any = {};
    if (httpParams) {
      header.params = httpParams;
    }
    return this.http.get<any>(this.apiUrl + url, header);
  }

  delete(url, httpParams?, loader = true) {
    if (loader) {
      this.loaderService.loader.next(loader);
    }
    const header = null;
    if (httpParams) {
      header.params = httpParams;
    }

    return this.http.delete(this.apiUrl + url, header);
  }
}
