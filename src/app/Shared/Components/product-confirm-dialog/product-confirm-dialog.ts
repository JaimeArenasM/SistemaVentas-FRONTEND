import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-confirm-dialog.html',
  styleUrls: ['./product-confirm-dialog.css']
})
export class ProductConfirmDialog {
  title: string;
  message: string;
  confirmText: string;

  constructor(
    private dialogRef: MatDialogRef<ProductConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data?.title || 'Confirmar';
    this.message = data?.message || '¿Estás seguro?';
    this.confirmText = data?.confirmText || 'Aceptar';
  }

  onConfirm() { this.dialogRef.close(true); }
  onCancel() { this.dialogRef.close(false); }
}
