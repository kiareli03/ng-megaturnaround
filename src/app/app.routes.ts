import { Routes } from '@angular/router';
import { BetsComponent } from './pages/bets/bets.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: BetsComponent }, 
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/' },   
];
