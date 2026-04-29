import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCard } from "@angular/material/card";

import { ProductConfirmDialog } from '../../../../Shared/Components/product-confirm-dialog/product-confirm-dialog';
import { ProductFormDialog } from '../../../../Shared/Components/product-form-dialog/product-form-dialog';
import { FormsModule } from '@angular/forms';

import { Product } from '../../../../Core/Interfaces/IProduct.interface';

@Component({
  selector: 'app-gestion-productos-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    
    FormsModule
  ],
  templateUrl: './gestion-productos-page.html',
  styleUrl: './gestion-productos-page.css',
})
export class GestionProductosPage {

  private dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<Product>([]);

  displayedColumns: string[] = ['id', 'name', 'price', 'image', 'description', 'category', 'acciones'];

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    const productos = JSON.parse(localStorage.getItem('donPepe_products_db') || '[]');
    this.dataSource.data = productos;
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  abrirModalProducto(producto?: Product) {
    const dialogRef = this.dialog.open(ProductFormDialog, {
      width: '500px',
      data: producto ? { ...producto } : null
    });

    dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {
      let db = JSON.parse(localStorage.getItem('donPepe_products_db') || '[]');

      if (producto) {
        const index = db.findIndex((p: Product) => p.id === producto.id);
        if (index !== -1) db[index] = resultado;
      } else {
        resultado.id = db.length + 1;
        db.push(resultado);
      }

      localStorage.setItem('donPepe_products_db', JSON.stringify(db));
      this.cargarDatos();
    }
    });
  }

  eliminar(producto: Product) {
    const dialogRef = this.dialog.open(ProductConfirmDialog, {
      data: {
        title: 'Confirmar Eliminación',
        message: `¿Desea eliminar el producto ${producto.name}?`,
        confirmText: 'Eliminar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let db = JSON.parse(localStorage.getItem('donPepe_products_db') || '[]');
        db = db.filter((p: Product) => p.id !== producto.id);
        localStorage.setItem('donPepe_products_db', JSON.stringify(db));
        this.cargarDatos();
      }
    });
  }
}
