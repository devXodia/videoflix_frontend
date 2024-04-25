import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss',
})
export class PasswordResetComponent {

showForm: boolean = false;
showLoading: boolean = false;
showLinkSent: boolean = true;


}

