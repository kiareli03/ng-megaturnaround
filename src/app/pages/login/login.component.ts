import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginButtonComponent } from '../../components/login-button/login-button.component';

@Component({
  selector: 'app-login',
  imports: [LoginButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  async login() {
    await this.authService.login();
    this.router.navigateByUrl('/');
  }
}
