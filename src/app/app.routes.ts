import { CanActivateFn, Router, Routes } from '@angular/router';
import { BetsComponent } from './pages/bets/bets.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.isLogged$.pipe(
        map(isLogged => isLogged ? true : router.parseUrl('/login'))
    );
}

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: BetsComponent, canActivate: [authGuard] }, 
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/' },   
];
