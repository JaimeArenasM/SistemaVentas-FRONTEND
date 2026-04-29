import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../../Core/Interfaces/IProduct.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-product-form-dialog',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
],

  templateUrl: './product-form-dialog.html',
  styleUrls: ['./product-form-dialog.css']
})
export class ProductFormDialog {
  product: Product;

  constructor(
    private dialogRef: MatDialogRef<ProductFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Product | null
  ) {
    this.product = data ? { ...data } : { id: 0, name: '', price: 0, image: '', description: '', category: '' };
  }

  onSave() { this.dialogRef.close(this.product); }
  onCancel() { this.dialogRef.close(null); }
}
