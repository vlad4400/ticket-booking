import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string | null = null;

  constructor (private http: HttpClient) { }

  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>('/api/auth/login', user)
      .pipe(
        tap(({token})=>{
          localStorage.setItem('auth-token', token);
          this.setToken(token);
        }
      ));
  }

  register(user: User): Observable<User>{
    return this.http.post<User>('/api/auth/registr', user);
  }

  setToken(token: string | null) {
    this.token = token;
  }

  getToke(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }
}
