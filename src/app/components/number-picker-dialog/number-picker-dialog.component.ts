import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

interface NumberToPick {
  number: number;
  disabled: boolean;
  label: string;
}

@Component({
  selector: 'app-number-picker-dialog',
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './number-picker-dialog.component.html',
  styleUrl: './number-picker-dialog.component.scss'
})
export class NumberPickerDialogComponent {
  readonly dialogRef = inject(MatDialogRef<NumberPickerDialogComponent>);
  readonly data = inject<{ selectedNumber: number, selectedNumbers: number[] }>(MAT_DIALOG_DATA);
  numbersToPick = signal<NumberToPick[]>(Array.from({ length: 60 }).map((_, i) => (i + 1)).map(number => ({
    number,
    disabled: this.data.selectedNumbers.includes(number),
    label: number.toString().padStart(2, '0')
  })));

  selectNumber(chosenNumber: number) {
    this.dialogRef.close(chosenNumber);
  }
}
