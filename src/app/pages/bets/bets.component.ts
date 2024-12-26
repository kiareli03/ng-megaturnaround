import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { BetsService } from '../../services/bets.service';
import { AuthService } from '../../services/auth.service';
import { Bet, CreateBetDTO } from '../../interfaces/bet';
import { HeaderComponent } from '../../components/header/header.component';
import { BetComponent } from '../../components/bet/bet.component';

@Component({
  selector: 'app-bets',
  imports: [HeaderComponent, BetComponent, MatButtonModule],
  templateUrl: './bets.component.html',
  styleUrl: './bets.component.scss'
})
export class BetsComponent {
  private readonly betsService = inject(BetsService);
  private readonly authService = inject(AuthService);

  private loggedUser = toSignal(this.authService.loggedUser$);
  private bets = toSignal(this.betsService.getBets());
  private myBets = computed(() => this.bets()?.filter(bet => bet.userEmail === this.loggedUser()?.email && bet.userAvatarUrl !== 'result.jpg') || []);
  private otherBets = computed(() => this.bets()?.filter(bet => bet.userEmail !== this.loggedUser()?.email && bet.userAvatarUrl !== 'result.jpg') || []);
  winnerBet = computed(() => this.bets()?.find(bet => bet.userAvatarUrl === 'result.jpg'));

  isAdmin = computed(() => this.loggedUser()?.admin || false);
  isLoading = computed(() => !this.bets() || !this.loggedUser());
  sortedBets = computed(() => ([...this.myBets(), ...this.otherBets()]));  
  betsTotal = computed(() => this.loggedUser()?.bets || 0);
  betsLeft = computed(() => this.betsTotal() - this.myBets().length);

  isBetOwner(betUserEmail: string): boolean {
    return betUserEmail === this.loggedUser()?.email;
  }

  isBetOwnerAndNotDone(betUserEmail: string): boolean {
    return this.isBetOwner(betUserEmail) && !this.loggedUser()?.done;
  }

  createBet() {
    if (!this.betsLeft()) return;
    
    const user = this.loggedUser();
    if (!user) return;

    const betToCreate: CreateBetDTO = {
      numbers: [],
      userEmail: user.email,
      userAvatarUrl: user.avatarUrl,
    };
    this.betsService.createBet(betToCreate);
  }

  updateBet(betToUpdate: Bet) {
    this.betsService.updateBet(betToUpdate);
  }

}

