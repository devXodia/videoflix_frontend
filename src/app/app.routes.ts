import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { PasswordResetComponent } from './components/auth/password-reset/password-reset.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify/:token', component: VerifyEmailComponent },
];
