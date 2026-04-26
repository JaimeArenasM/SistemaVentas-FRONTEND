import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Pan Frances', price: 3.00, image: 'https://www.panaderiaalemana.com/wp-content/uploads/2020/11/Pan-frances-1.jpg', description: 'Pan recién horneado.', category: 'Harinas' },
    { id: 2, name: 'Avena en Hojuelas', price: 4.50, image: 'https://ecovalle.pe/wp-content/uploads/2022/08/HOJUELAS-DE-AVENA-NACIONAL-250-G.jpg', description: 'Cereal alto en fibra.', category: 'Cereales' },
    { id: 3, name: 'Galletas Field de Vainilla', price: 2.80, image: 'https://mitierraperu.com/wp-content/uploads/2025/03/Field-vainilla.png', description: 'Snack saludable.', category: 'Snacks' },
    { id: 4, name: 'Detergente ACE ', price: 4.50, image: 'https://aceleralastatic.nyc3.cdn.digitaloceanspaces.com/files/uploads/1499/1771281526-26-1602720046-103-img-8816-ok-png-png.png', description: 'Detergente quita manchas', category: 'Detergentes' },
    { id: 5, name: 'Leche Deslactosada', price: 4.20, image: 'https://storage.googleapis.com/web-laive-storage/Media//4.%20Laive%20Leche%20Sin%20Lactosa%20lista%20para%20consumir%20946%20ml%20v2.jpg', description: 'Leche sin lactosa.', category: 'Bebidas' },
    { id: 6, name: 'Fresa', price: 15.00, image: 'https://png.pngtree.com/png-vector/20250227/ourmid/pngtree-box-of-strawberries-tasty-box-vitamines-png-image_15621124.png', description: 'Fruta fresca', category: 'Frutas' },
    { id: 7, name: 'Harina de Trigo ', price: 3.50, image: 'https://miamarket.pe/assets/uploads/eae4185d4a3b48d501a1759914f00097.png', description: 'Para tus preparaciones.', category: 'Harinas' },
    { id: 8, name: 'Agua Mineral', price: 1.50, image: 'https://resources.coca-colaentuhogar.com/media/catalog/product/c/i/cie-natu-nor-pet-1l-6pz.png', description: 'Agua purificada.', category: 'Bebidas' }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }
}