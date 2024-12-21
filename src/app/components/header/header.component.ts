import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-header',
  imports: [MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  loggedUser = toSignal(this.authService.loggedUser$);
  avatarUrl = computed(() => this.loggedUser()?.avatarUrl || '');

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
