// login-redirect.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      const role = this.authService.getUserRole();
      
      if (role === 'admin') {
        this.router.navigate(['user-management']);
        return false;
      } else if (role === 'user') {
        this.router.navigate(['monthly-plans']);
        return false;
      }
    }
    
    return true;
  }
}