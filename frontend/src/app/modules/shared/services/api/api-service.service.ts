import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  post(endpoint: string, body: any = {}){
    console.log("post");
    
    return this.http.post(
      endpoint,
      body
    ).pipe(
      catchError((error) => {
        return error;
      })
    )
  }
}
