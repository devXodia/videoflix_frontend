import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { PasswordResetComponent } from './components/auth/password-reset/password-reset.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'auth/password-reset', component: PasswordResetComponent },
];
