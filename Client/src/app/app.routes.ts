import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { LoginRedirectGuard } from './guards/login-redirect.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full',},
  { path: 'signup', loadComponent: () => import('./sign-up/sign-up.component').then((c) => c.SignupComponent) },
  { path: 'login', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent), canActivate: [LoginRedirectGuard] },
  { path: 'user-management', loadComponent: () => import('./user-management/user-management.component').then((c) => c.UserManagementComponent), canActivate: [authGuard] },
  { path: 'monthly-plans', loadComponent: () => import('./monthly-plans/monthly-plans.component').then((c) => c.MonthlyPlansComponent), canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];
