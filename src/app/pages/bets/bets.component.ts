import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BetsService } from '../../services/bets.service';
import { Bet, CreateBetDTO } from '../../interfaces/bet';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { NumberPickerDialogComponent } from '../../components/number-picker-dialog/number-picker-dialog.component';
import { map } from 'rxjs';
// import { User } from '../../interfaces/user';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrl: './bets.component.scss'
})
export class BetsComponent {
  private readonly betsService = inject(BetsService);
  private readonly authService = inject(AuthService);
  private readonly dialog = inject(MatDialog);

  loggedUser = toSignal(this.authService.loggedUser$);
  bets = toSignal(this.betsService.getBets().pipe(map(bets => this.sortBets(bets))), { initialValue: [] });

  getValid(numbers: number[]): boolean {
    return numbers.every(n => n);
  }

  openNumberPickerDialog(bet: Bet, selectedNumber: number): void {
    const dialogRef = this.dialog.open(NumberPickerDialogComponent, {
      data: { selectedNumber, selectedNumbers: bet.numbers },
    });

    dialogRef.afterClosed().subscribe(chosenNumber => {
      if (!chosenNumber) return;

      const numbers: number[] = [...bet.numbers.filter(n => n && n !== selectedNumber), chosenNumber].sort((a, b) => a - b);
      numbers.push(0, 0, 0, 0, 0, 0);
      const betToUpdate: Bet = { ...bet, numbers: numbers.slice(0, 6) };
      this.betsService.updateBet(betToUpdate);
    });
  }

  createBet() {
    // const user = this.loggedUser();
    // if (!user) return;

    const betToCreate: CreateBetDTO = {
      numbers: [0, 0, 0, 0, 0, 0],
      userId: 'matsushitakoiti@gmail.com',
      userAvatarUrl: 'https://lh3.googleusercontent.com/a/ACg8ocLMkthZIxmBkc9AQAahCU8zCQBi4cv4Z6j70-Eb01PhUcWqDHR9vQ=s96-c',
      // userAvatarUrl: user.userAvatarUrl
    };
    this.betsService.createBet(betToCreate);
  }

  deleteBet(id: string) {
    this.betsService.deleteBet(id);
  }

  private sortBets(bets: Bet[]): Bet[] {
    return [
      ...bets.filter(bet => bet.userId === 'r.paivabr@gmail.com'), 
      ...bets.filter(bet => bet.userId !== 'r.paivabr@gmail.com')
    ];
  }

}
