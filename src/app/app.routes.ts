import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { PasswordResetComponent } from './components/auth/password-reset/password-reset.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { SetNewPasswordComponent } from './components/auth/password-reset/set-new-password/set-new-password.component';
import { HomeComponent } from './components/main/home/home.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify/:token', component: VerifyEmailComponent },
  {path: 'set-password/:token', component: SetNewPasswordComponent},
  {path: 'home', component: HomeComponent}
];
