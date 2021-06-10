import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = '';

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

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {

    if (this.token) {
      let timeExp: number = JSON.parse(atob(this.token.split('.')[1])).exp * 1000;
      let timeNow: number = new Date().getTime();

      if (!(timeExp > timeNow)) {
        this.logout();
      }

      return timeExp > timeNow;
    } else {

      return false;
    }
  }

  logout() {
    this.setToken('');
    localStorage.clear();
  }
}
