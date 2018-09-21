import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {
  path = 'http://localhost:3000/home';

  constructor(private http: HttpClient) { }

  getCourses() {
    return this.http.get(this.path + '/home');
  }

  getProfile(id) {
    return this.http.get(this.path + '/profile/' + id);
  }

  getResults(code) {
    return this.http.get(this.path + '/results/' + code);
  }
}
