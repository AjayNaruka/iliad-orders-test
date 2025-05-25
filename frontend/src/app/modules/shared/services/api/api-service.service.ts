import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient, private router: Router) {}

  post(endpoint: string, body: any = {}) {
    return this.http.post(endpoint, body).pipe(
      catchError((error) => {
        return error;
      })
    );
  }

  get<T>(endpoint: string, body: any = {}): Observable<T> {
    return this.http.get<T>(endpoint).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  getAuth<T>(endpoint: string, body: any = {}): Observable<T> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<T>(endpoint, {headers}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  postAuth<T>(endpoint: string, body: any = {}) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(endpoint, body, { headers }).pipe(
      catchError((error) => {
        return error;
      })
    );
  }
}
