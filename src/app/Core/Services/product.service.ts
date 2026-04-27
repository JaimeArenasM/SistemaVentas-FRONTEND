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

        { id: 1, name: 'Pan Frances', price: 3.00, image: 'https://trigodeoro.com.pe/wp-content/uploads/2023/02/frances-gigante-600x600.png', description: 'Pan recién horneado.', category: 'Harinas' },
        { id: 2, name: 'Avena en Hojuelas', price: 4.50, image: 'https://ecovalle.pe/wp-content/uploads/2022/08/HOJUELAS-DE-AVENA-NACIONAL-250-G.jpg', description: 'Cereal alto en fibra.', category: 'Cereales' },
        { id: 3, name: 'Galletas Field de Vainilla', price: 2.80, image: 'https://mitierraperu.com/wp-content/uploads/2025/03/Field-vainilla.png', description: 'Snack saludable.', category: 'Snacks' },
        { id: 4, name: 'Detergente ACE', price: 4.50, image: 'https://aceleralastatic.nyc3.cdn.digitaloceanspaces.com/files/uploads/1499/1771281526-26-1602720046-103-img-8816-ok-png-png.png', description: 'Detergente quita manchas', category: 'Detergentes' },
        { id: 5, name: 'Leche Deslactosada', price: 4.20, image: 'https://storage.googleapis.com/web-laive-storage/Media//4.%20Laive%20Leche%20Sin%20Lactosa%20lista%20para%20consumir%20946%20ml%20v2.jpg', description: 'Leche sin lactosa.', category: 'Bebidas' },
        { id: 6, name: 'Fresa', price: 15.00, image: 'https://png.pngtree.com/png-vector/20250227/ourmid/pngtree-box-of-strawberries-tasty-box-vitamines-png-image_15621124.png', description: 'Fruta fresca', category: 'Frutas' },
        { id: 7, name: 'Harina de Trigo', price: 3.50, image: 'https://miamarket.pe/assets/uploads/eae4185d4a3b48d501a1759914f00097.png', description: 'Para tus preparaciones.', category: 'Harinas' },
        { id: 8, name: 'Agua Mineral', price: 1.50, image: 'https://resources.coca-colaentuhogar.com/media/catalog/product/c/i/cie-natu-nor-pet-1l-6pz.png', description: 'Agua purificada.', category: 'Bebidas' },
        { id: 9, name: 'Papas Lays Clásicas', price: 2.50, image: 'https://plazavea.vteximg.com.br/arquivos/ids/28551460-1000-1000/20092265.jpg', description: 'Snack salado tradicional.', category: 'Snacks' },
        { id: 10, name: 'Cereal Ángel Mel', price: 8.50, image: 'https://dojiw2m9tvv09.cloudfront.net/11132/product/X_7759542000213.jpg', description: 'Hojuelas de maíz con miel.', category: 'Cereales' },
        { id: 11, name: 'Inca Kola 1.5L', price: 7.50, image: 'https://licoreriasunidas.pe/wp-content/uploads/2021/04/Gaseosa-Inca-Kola-Original-Botella-Plastica-1.5L.jpg', description: 'El sabor que nos hace únicos.', category: 'Bebidas' },
        { id: 12, name: 'Plátano Seda', price: 3.00, image: 'https://tofuu.getjusto.com/geo-micromarket/pictures/614ce4546af8e900222a7f51/large_7b4c6e913a01-a-PLATANO-SEDA-KG.jpg', description: 'Kilo de plátano fresco.', category: 'Frutas' },
        { id: 13, name: 'Jabón Bolívar', price: 5.50, image: 'https://plazavea.vteximg.com.br/arquivos/ids/530663-1000-1000/182601.jpg', description: 'Pack x3 para ropa limpia.', category: 'Detergentes' },
        { id: 14, name: 'Galletas Morochas', price: 1.20, image: 'https://wongfood.vtexassets.com/arquivos/ids/601115/Galleta-Baniada-Morochas-Nestle-Paquete-6-Unidades-30-g-1-29471.jpg', description: 'Galletas bañadas en chocolate.', category: 'Snacks' }
      ];

      // Lo guardamos en el LocalStorage
      localStorage.setItem(this.DB_PRODUCTS_KEY, JSON.stringify(mockProducts));
    }
  }
}
