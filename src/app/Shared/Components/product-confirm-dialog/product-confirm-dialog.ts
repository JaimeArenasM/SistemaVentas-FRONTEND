import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-confirm-dialog.html',
  styleUrls: ['./product-confirm-dialog.css']
})
export class ProductConfirmDialog {
  @Input() message = '¿Estás seguro de eliminar este producto?';
  @Output() confirm = new EventEmitter<boolean>();

  onConfirm() { this.confirm.emit(true); }
  onCancel() { this.confirm.emit(false); }
}
