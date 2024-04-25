import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { DjangoResponse } from '../interfaces/DjangoResponse.interface';

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
    this.auth.verifyUser(this.userToken).subscribe({
      next: (resp: DjangoResponse) => {
        this.showSuccess();
        this.redirectToHome();
      },
      error: (err: HttpErrorResponse) => {
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
    setTimeout(() => {
      this.verifySuccess = false;
      this.loading = false;
    }, 2000);
  }

  redirectToHome() {
    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 8000);
  }
}
