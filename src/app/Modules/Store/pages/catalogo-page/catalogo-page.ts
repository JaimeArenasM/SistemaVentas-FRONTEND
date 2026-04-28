import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-catalogo-page',
  imports: [
    CommonModule
  ],
  templateUrl: './catalogo-page.html',
  styleUrl: './catalogo-page.css',
})
export class CatalogoPage {

  imagenes = [
    'assets/img/portadalimpieza.png',
    'assets/img/tiendasinlogo.png',
    'assets/img/tiendadedonpepe.png'
  ];

  indice = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.siguiente();
    }, 3000);
  }

  siguiente() {
    this.indice = (this.indice + 1) % this.imagenes.length;
  }

  anterior() {
    this.indice =
      (this.indice - 1 + this.imagenes.length) % this.imagenes.length;
  }
}