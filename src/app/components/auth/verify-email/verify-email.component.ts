import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent {
  verifySuccess: boolean = false;
  verifyError: boolean = false;
  loading: boolean = true;

  success() {
    this.loading = false;
    this.verifySuccess = true;
  }

  error() {
    this.verifySuccess = false;
    this.loading = false;
  }

  loadingState() {
    this.verifyError = false;
    this.verifySuccess = false;
    this.loading = true;
  }
}
