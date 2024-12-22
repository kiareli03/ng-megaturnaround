import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle, MatDialogActions } from '@angular/material/dialog';

export interface AlertModalData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-alert-modal',
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.scss'
})
export class AlertModalComponent {
  readonly dialogRef = inject(MatDialogRef<AlertModalComponent>);
  readonly data = inject<AlertModalData>(MAT_DIALOG_DATA);

  cancel() {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
