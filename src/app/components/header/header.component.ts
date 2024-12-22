import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { AlertModalComponent, AlertModalData } from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  loggedUser = toSignal(this.authService.loggedUser$);
  avatarUrl = computed(() => this.loggedUser()?.avatarUrl || '');

  openLogoutModal(): void {
    const data: AlertModalData = { title: 'Logout', message: 'Tem certeza que quer sair?' };
    const dialogRef = this.dialog.open(AlertModalComponent, { data, disableClose: true });

    dialogRef.afterClosed().subscribe(confirm => {
      if (!confirm) return;

      this.logout();
    });
  }

  private async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
