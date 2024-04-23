import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
  userToken: string = '';

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const token = params['token'];
      this.userToken = token;
      this.verifyUser();
    });
  }

  verifyUser() {
    this.auth.verify_user(this.userToken).subscribe({
      next: (resp) => {
        this.showSuccess();
        this.redirectToHome();
      },
      error: (err) => {
        this.showError();
      },
    });
  }

  showSuccess() {
    setTimeout(() => {
      this.loading = false;
      this.verifySuccess = true;
    }, 3000);
  }

  showError() {
    this.verifySuccess = false;
    this.loading = false;
  }

  loadingState() {
    this.verifyError = false;
    this.verifySuccess = false;
    this.loading = true;
  }

  redirectToHome() {
    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 8000);
  }
}
