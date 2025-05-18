import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/login', body, {headers: headers, withCredentials: true}).pipe(
      tap((response: any) => {
        localStorage.setItem('currentUser', JSON.stringify(response));
      })
    );
  }

  registerUser(user: User) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('name', user.name);
    body.set('isAdvisor', 'false');
    body.set('address', user.address);
    body.set('password', user.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/register', body, {headers: headers});
  }

  registerAdvisor(user: User) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('name', user.name);
    body.set('isAdvisor', 'true');
    body.set('address', user.address);
    body.set('password', user.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/register', body, {headers: headers});
  }

  logout() {
    return this.http.post('http://localhost:5000/app/logout', {}, {withCredentials: true, responseType: 'text'});
  }

  checkAuth() {
    return this.http.get<boolean>('http://localhost:5000/app/checkAuth', {withCredentials: true});
  }

  getCurrentUser() {
    return !!localStorage.getItem('currentUser') ?  JSON.parse(localStorage.getItem('currentUser')!) : undefined;
  }

  isLoggedIn() {
    var isLoggedIn = false;
    const user = this.getCurrentUser();
    if (user && user.email) {
      isLoggedIn = true;
    }
    return isLoggedIn;
  } 

  getUserRole() {
    const user = this.getCurrentUser();
    if (user && user.isAdvisor) {
      return 'admin';
    } else {
      return 'user';
    }
  }
}
