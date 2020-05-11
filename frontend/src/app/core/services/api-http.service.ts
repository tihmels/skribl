import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {

  private header = new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

  private options = {headers: this.header, withCredentials: true}

  constructor(
    private http: HttpClient
  ) {
  }

  public get<T>(url: string, options = this.options): Observable<T> {
    return this.http.get<T>(url, options);
  }

  public post<T>(url: string, data: T, options = this.options): Observable<T> {
    return this.http.post<T>(url, data, options);
  }

  public put<T>(url: string, data: T, options = this.options): Observable<T> {
    return this.http.put<T>(url, data, options);
  }

  public delete(url: string, options = this.options) {
    return this.http.delete(url, options);
  }
}
