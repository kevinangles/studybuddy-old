import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CoreService {
  path = 'http://localhost:3000/auth';
  TOKEN_KEY = 'token';

  constructor(public http: HttpClient) { }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  loginUser(loginData) {
    this.http.post<any>(this.path + '/welcome', loginData).subscribe(res => {
      this.saveToken(res.token);
    });
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
