import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  post(endpoint: string, body: any = {}){
    
    return this.http.post(
      endpoint,
      body
    ).pipe(
      catchError((error) => {
        return error;
      })
    )
  }

  get<T>(endpoint: string, body: any = {}): Observable<T>{
    
    return this.http.get<T>(
      endpoint
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    )
  }
}
