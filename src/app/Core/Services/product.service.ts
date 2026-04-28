import { Observable, of } from "rxjs";
import { Product } from "../Interfaces/IProduct.interface";
import { C } from "@angular/cdk/keycodes";
import { Injectable } from "@angular/core";



@Injectable({providedIn:'root'})
export class ProductService{

  private readonly DB_PRODUCTS_KEY= 'donPepe_products';

  constructor(){
    this.cargarProductosPorDefecto();
  }

  /**METODO PARA QUE EL CATALOGO LEA LOS PRODUCTOS */
  getProductos(): Observable<Product[]>{

    const data= localStorage.getItem(this.DB_PRODUCTS_KEY);
    const productos= data ? JSON.parse(data):[];
    return of(productos);
  }

  /*METODO PARA QUE EL ADMIN GUARDE CAMBIOS */
  saveProducts(productos: Product[]):void{
    localStorage.setItem(this.DB_PRODUCTS_KEY, JSON.stringify(productos));
  }

  /**DATOS INICIALES */
  private cargarProductosPorDefecto(){
    if(!localStorage.getItem(this.DB_PRODUCTS_KEY)){
      const mockProducts: Product[] = [

        { id: 1, name: 'Avena en Hojuelas', price: 4.50, image: 'https://ecovalle.pe/wp-content/uploads/2022/08/HOJUELAS-DE-AVENA-NACIONAL-250-G.jpg', description: 'Cereal alto en fibra.', category: 'Cereales' },
        { id: 2, name: 'Galletas Field de Vainilla', price: 2.80, image: 'https://oechsle.vteximg.com.br/arquivos/ids/1890456-1000-1000/image-7db686787e2c426897ab06f991e87b77.jpg?v=637495395967800000', description: 'Snack saludable.', category: 'Snacks' },
        { id: 3, name: 'Detergente ACE', price: 4.50, image: 'https://aceleralastatic.nyc3.cdn.digitaloceanspaces.com/files/uploads/1499/1771281526-26-1602720046-103-img-8816-ok-png-png.png', description: 'Detergente quita manchas', category: 'Detergentes' },
        { id: 4, name: 'Leche Deslactosada', price: 4.20, image: 'https://storage.googleapis.com/web-laive-storage/Media//4.%20Laive%20Leche%20Sin%20Lactosa%20lista%20para%20consumir%20946%20ml%20v2.jpg', description: 'Leche sin lactosa.', category: 'Bebidas' },
        { id: 5, name: 'Fresa', price: 15.00, image: 'https://png.pngtree.com/png-vector/20250227/ourmid/pngtree-box-of-strawberries-tasty-box-vitamines-png-image_15621124.png', description: 'Fruta fresca', category: 'Frutas' },
        { id: 6, name: 'Agua Mineral', price: 1.50, image: 'https://resources.coca-colaentuhogar.com/media/catalog/product/c/i/cie-natu-nor-pet-1l-6pz.png', description: 'Agua purificada.', category: 'Bebidas' },
        { id: 7, name: 'Papas Lays Clásicas', price: 2.50, image: 'https://aceleralastatic.nyc3.cdn.digitaloceanspaces.com/files/uploads/1499/1596226959-77-frito-lay-papas-lays-clasicas-70-jpg.jpg', description: 'Snack salado tradicional.', category: 'Snacks' },
        { id: 8, name: 'Cereal Ángel Mel', price: 1.50, image: 'https://images.rappi.pe/products/1719005557489_1719005555337_1719005550832.png', description: 'Hojuelas de maíz con miel.', category: 'Cereales' },
        { id: 9, name: 'Inca Kola 1.5L', price: 7.50, image: 'https://www.donbelisario.com.pe/media/catalog/product/2/1/2146463136.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700&format=jpeg', description: 'El sabor que nos hace únicos.', category: 'Bebidas' },
        { id: 10, name: 'Plátano Seda', price: 3.00, image: 'https://arandanosdelhuerto.com/wp-content/uploads/2021/10/platano-seda-normal_1000x1000-1-450x450.png', description: 'Kilo de plátano fresco.', category: 'Frutas' },
        { id: 11, name: 'Jabón Bolívar', price: 5.50, image: 'https://corporacionliderperu.com/51237-large_default/bolivar-jabon-vida-x-190-gr-cuidado-total.jpg', description: 'Pack x3 para ropa limpia.', category: 'Detergentes' },
        { id: 12, name: 'Galletas Morochas', price: 1.20, image: 'https://grandcentral.pe/wp-content/uploads/2025/09/GCG086-M1.jpg', description: 'Galletas bañadas en chocolate.', category: 'Snacks' }
      ];

      // Lo guardamos en el LocalStorage
      localStorage.setItem(this.DB_PRODUCTS_KEY, JSON.stringify(mockProducts));
    }
  }
}
