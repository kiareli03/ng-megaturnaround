import { Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PadStartPipe } from '../../pipes/pad-start.pipe';
import { Bet } from '../../interfaces/bet';
import { MatDialog } from '@angular/material/dialog';
import { NumberPickerDialogComponent, NumberPickerDialogData } from '../number-picker-dialog/number-picker-dialog.component';
import { AlertModalComponent, AlertModalData } from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-bet',
  imports: [MatButtonModule, MatIconModule, PadStartPipe],
  templateUrl: './bet.component.html',
  styleUrl: './bet.component.scss'
})
export class BetComponent {
  private readonly dialog = inject(MatDialog);

  bet = input.required<Bet>();
  disabled = input(true);
  update = output<Bet>();

  openNumberPickerDialog(bet: Bet, selectedNumber: number): void {
    if (this.disabled()) return;

    const data: NumberPickerDialogData = { selectedNumber, selectedNumbers: bet.numbers };
    const dialogRef = this.dialog.open(NumberPickerDialogComponent, { data });

    dialogRef.afterClosed().subscribe(chosenNumber => {
      if (!chosenNumber) return;

      const numbers: number[] = [...bet.numbers.filter(n => n && n !== selectedNumber), chosenNumber].sort((a, b) => a - b);
      const betToUpdate: Bet = { ...bet, numbers };

      this.update.emit(betToUpdate);
    });
  }
 
  openRandomAlertModal(): void {
    const data: AlertModalData = { title: 'Gerar números', message: 'Gostaria de gerar números aleatórios?' };
    const dialogRef = this.dialog.open(AlertModalComponent, { data, disableClose: true });

    dialogRef.afterClosed().subscribe(confirm => {
      if (!confirm) return;

      this.random();
    });
  }

  private random() {
    if (this.disabled()) return;

    const bet = this.bet();
    const numbers: number[] = bet.numbers.map(n => Math.ceil(Math.random() * 60)).sort((a, b) => a - b);
    console.log(numbers);    

    const betToUpdate: Bet = { ...bet, numbers };
    this.update.emit(betToUpdate);
  }
}
