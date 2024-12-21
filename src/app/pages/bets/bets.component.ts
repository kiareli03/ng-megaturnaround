import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
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
  private readonly dialog = inject(MatDialog);

  private loggedUser = toSignal(this.authService.loggedUser$);
  private bets = toSignal(this.betsService.getBets());
  private myBets = computed(() => this.bets()?.filter(bet => bet.userEmail === this.loggedUser()?.email) || []);
  private otherBets = computed(() => this.bets()?.filter(bet => bet.userEmail !== this.loggedUser()?.email) || []);

  isLoading = computed(() => !this.bets());
  sortedBets = computed(() => ([...this.myBets(), ...this.otherBets()]));  
  betsTotal = computed(() => this.loggedUser()?.bets || 0);
  betsLeft = computed(() => this.betsTotal() - this.myBets().length);

  winnerBet: Bet = {
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 'winner',
    numbers: [0, 0, 0, 0, 0, 0],
    userAvatarUrl: 'result.jpg',
    userEmail: '',
  }

  isBetOwner(betUserEmail: string): boolean {
    return betUserEmail === this.loggedUser()?.email;
  }

  getValid(numbers: number[]): boolean {
    return numbers.every(n => n);
  }

  createBet() {
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

  deleteBet(id: string) {
    console.log(id)
    this.betsService.deleteBet(id);
  }
}
