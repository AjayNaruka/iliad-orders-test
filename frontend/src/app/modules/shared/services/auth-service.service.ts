import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private token = "token";

  public setToken(token: string): void {
    localStorage.setItem(this.token, token)
  }

  public getToken(): string | null {
    return localStorage.getItem(this.token);
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  public logout(): void {
    localStorage.removeItem(this.token);
  }
}
