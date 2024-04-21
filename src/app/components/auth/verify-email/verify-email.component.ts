import { Component } from '@angular/core';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent {
  verifySuccess: boolean = false;
  verifyError: boolean = false;
  loading: boolean = false;

  switchMe() {
    this.loading = !this.loading;
  }
}
