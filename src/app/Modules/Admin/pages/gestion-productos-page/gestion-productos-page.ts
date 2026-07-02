import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from "@angular/material/card";
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ProductConfirmDialog } from '../../../../Shared/Components/product-confirm-dialog/product-confirm-dialog';
import { ProductFormDialog } from '../../../../Shared/Components/product-form-dialog/product-form-dialog';
import { Product } from '../../../../Core/Interfaces/IProduct.interface';
import { ProductService } from '../../../../Core/Services/product.service';

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
  private productService = inject(ProductService);

  dataSource = new MatTableDataSource<Product>([]);
  // Columnas actualizadas incluyendo 'estado'
  displayedColumns: string[] = ['producto', 'categoria', 'precio', 'stock', 'estado', 'acciones'];

  categoriaSeleccionada: string = 'Todos';
  textoBusqueda: string = '';
  categorias: string[] = ['Todos', 'Cereales', 'Snacks', 'Detergentes', 'Bebidas', 'Lácteos', 'Frutas'];

  ngOnInit() {
    this.dataSource.filterPredicate = (data: Product, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      const coincideTexto = data.nombre.toLowerCase().includes(searchTerms.texto) ||
                            (data.descripcion ? data.descripcion.toLowerCase().includes(searchTerms.texto) : false);

      const coincideCategoria = searchTerms.categoria === 'Todos' || data.nombreCategoria === searchTerms.categoria;

      return coincideTexto && coincideCategoria;
    };

    this.cargarDatos();
  }

  cargarDatos() {
    this.productService.getProductos().subscribe({
      next: (data: any) => {
        this.dataSource.data = data.content ? data.content : data;
        this.aplicarFiltroCompuesto();
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  aplicarFiltroCompuesto() {
    const filtros = {
      texto: this.textoBusqueda.trim().toLowerCase(),
      categoria: this.categoriaSeleccionada
    };
    this.dataSource.filter = JSON.stringify(filtros);
  }

  abrirModalProducto(producto?: Product) {
    const dialogRef = this.dialog.open(ProductFormDialog, {
      width: '600px',
      data: producto ? { ...producto } : null
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        if (producto) {
          this.productService.actualizarProducto(producto.idProducto, resultado).subscribe({
            next: () => {
              alert('✅ Producto actualizado con éxito');
              this.cargarDatos();
            },
            error: (err) => console.error('Error al actualizar:', err)
          });
        } else {
          this.productService.saveProducts(resultado).subscribe({
            next: () => {
              alert('✅ Nuevo producto agregado a la tienda');
              this.cargarDatos();
            },
            error: (err) => console.error('Error al crear:', err)
          });
        }
      }
    });
  }

  eliminar(producto: Product) {
    const dialogRef = this.dialog.open(ProductConfirmDialog, {
      data: {
        title: 'Desactivar Producto',
        message: `¿Desea desactivar el producto "${producto.nombre}"? Ya no aparecerá en la tienda para los clientes.`,
        confirmText: 'Desactivar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.eliminarProducto(producto.idProducto).subscribe({
          next: () => {
            this.cargarDatos();
          },
          error: (err) => console.error('Error al desactivar:', err)
        });
      }
    });
  }

  // NUEVA FUNCIÓN: Reactivar el producto inactivo
  reactivar(producto: Product) {
    const dialogRef = this.dialog.open(ProductConfirmDialog, {
      data: {
        title: 'Reactivar Producto',
        message: `¿Desea volver a activar el producto "${producto.nombre}"? Volverá a estar disponible para la venta.`,
        confirmText: 'Reactivar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.reactivarProducto(producto.idProducto).subscribe({
          next: () => {
            this.cargarDatos();
          },
          error: (err) => console.error('Error al reactivar:', err)
        });
      }
    });
  }
}
