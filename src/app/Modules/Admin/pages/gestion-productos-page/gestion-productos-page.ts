import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from "@angular/material/card";

import { ProductConfirmDialog } from '../../../../Shared/Components/product-confirm-dialog/product-confirm-dialog';
import { ProductFormDialog } from '../../../../Shared/Components/product-form-dialog/product-form-dialog';
import { FormsModule } from '@angular/forms';

// IMPORTAMOS SELECT Y FORM FIELD PARA EL FILTRO
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Product } from '../../../../Core/Interfaces/IProduct.interface';

@Component({
  selector: 'app-gestion-productos-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './gestion-productos-page.html',
  styleUrl: './gestion-productos-page.css',
})
export class GestionProductosPage implements OnInit {

  private dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<Product>([]);
  displayedColumns: string[] = ['id', 'name', 'price', 'image', 'description', 'category', 'acciones'];
  categoriaSeleccionada: string = 'Todos';
  textoBusqueda: string = '';

  // Lista de categorías de tu tienda
  categorias: string[] = ['Todos', 'Cereales', 'Snacks', 'Detergentes', 'Bebidas', 'Lácteos', 'Frutas'];

  ngOnInit() {
    this.cargarDatos();

    this.dataSource.filterPredicate = (data: Product, filter: string) => {
      const searchTerms = JSON.parse(filter);
      const coincideTexto = data.name.toLowerCase().includes(searchTerms.texto) ||
                            data.description.toLowerCase().includes(searchTerms.texto);

      const coincideCategoria = searchTerms.categoria === 'Todos' || data.category === searchTerms.categoria;

      return coincideTexto && coincideCategoria;
    };
    this.cargarDatos();
  }

  cargarDatos() {
    const productos = JSON.parse(localStorage.getItem('donPepe_products') || '[]');
    this.dataSource.data = productos;
    this.aplicarFiltroCompuesto();
  }

  // MÉTODO PARA FILTRAR
  aplicarFiltroCompuesto() {
    const filtros = {
      texto: this.textoBusqueda.trim().toLowerCase(),
      categoria: this.categoriaSeleccionada
    };

    this.dataSource.filter = JSON.stringify(filtros);
  }

  abrirModalProducto(producto?: Product) {
    const dialogRef = this.dialog.open(ProductFormDialog, {
      width: '500px',
      data: producto ? { ...producto } : null
    });

    dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {
      let db = JSON.parse(localStorage.getItem('donPepe_products') || '[]');

      if (producto) {
        const index = db.findIndex((p: Product) => p.id === producto.id);
        if (index !== -1) db[index] = resultado;
      } else {
        resultado.id = db.length > 0 ? Math.max(...db.map((p:any) => p.id)) + 1 : 1;
        db.push(resultado);
      }

      localStorage.setItem('donPepe_products', JSON.stringify(db));
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
        let db = JSON.parse(localStorage.getItem('donPepe_products') || '[]');
        db = db.filter((p: Product) => p.id !== producto.id);
        localStorage.setItem('donPepe_products', JSON.stringify(db));
        this.cargarDatos();
      }
    });
  }
}
