import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../Core/Interfaces/IProduct.interface';

@Component({
  selector: 'app-product-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form-dialog.html',
  styleUrls: ['./product-form-dialog.css']
})
export class ProductFormDialog {
  @Input() product: Product = { id: 0, name: '', price: 0, image: '', description: '', category: '' };
  @Output() save = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  onSave() { this.save.emit(this.product); }
  onCancel() { this.cancel.emit(); }
}
