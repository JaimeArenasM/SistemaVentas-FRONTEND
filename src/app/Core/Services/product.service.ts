import { Observable, of } from "rxjs";
import { Product } from "../Interfaces/IProduct.interface";
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
        { id: 12, name: 'Cereal Fresa', price: 0.50, image: 'https://dojiw2m9tvv09.cloudfront.net/49572/product/freziaalmohada0272.jpg', description: '1 unidad', category: 'Cereales' },
        { id: 13, name: 'Galletas Morochas', price: 1.20, image: 'https://grandcentral.pe/wp-content/uploads/2025/09/GCG086-M1.jpg', description: 'Cereal fresa almohaditas.', category: 'Snacks' },

{ id: 14, name: 'Cereal Angel Flakes', price: 6.80, image: 'https://perufarma.com.pe/wp-content/uploads/2022/02/4.png', description: 'Cereal de maíz crocante.', category: 'Cereales' },
{ id: 15, name: 'Avena Quaker', price: 5.90, image: 'https://www.pngitem.com/pimgs/b/9-92169_quaker-oats-png.png', description: 'Avena tradicional nutritiva.', category: 'Cereales' },
{ id: 16, name: 'Cereal fresitas', price: 9.50, image: 'https://cdn.acelerala.com/files/uploads/1499/1600743393-137-img-9255-jpg.jpg', description: 'Cereal de chocolate.', category: 'Cereales' },
{ id: 17, name: 'Cereal chocapic', price: 7.20, image: 'https://m.media-amazon.com/images/I/91KU4hxXXCL._SX679_.jpg', description: 'Granola con avena y miel.', category: 'Cereales' },

{ id: 18, name: 'Doritos Queso', price: 3.50, image: 'https://m.media-amazon.com/images/I/71ql7g8DRkL._AC_UL960_QL65_.jpg', description: 'Snack sabor queso.', category: 'Snacks' },
{ id: 19, name: 'Cheetos', price: 2.80, image: 'https://wallpapers.com/images/hd/cheetos-crunchy-snack-package-qd94haiam77ldxj6.png', description: 'Bocaditos crocantes.', category: 'Snacks' },
{ id: 20, name: 'Chizitos', price: 1.50, image: 'https://miamarket.pe/assets/uploads/1cfed3b10ead9c36e3bd8c43a7a91823.jpg', description: 'Snack de maíz.', category: 'Snacks' },
{ id: 21, name: 'Piqueo Snax', price: 4.20, image: 'https://candylandperu.com/wp-content/uploads/2024/10/piqueo-snack.png', description: 'Mix de snacks salados.', category: 'Snacks' },

{ id: 22, name: 'Ariel Líquido', price: 12.90, image: 'https://www.molinasecaonline.com/image/cache/data/Limpieza/ariel%20liquido%20actilift-882x882.jpg', description: 'Detergente líquido.', category: 'Detergentes' },
{ id: 23, name: 'Suavizante Downy', price: 8.90, image: 'https://www.miamarket.pe/assets/uploads/7ba1b85874a59f18135ea3bccd951e01.jpg', description: 'Ropa suave y perfumada.', category: 'Detergentes' },
{ id: 24, name: 'Lejía Clorox', price: 4.00, image: 'https://miamarket.pe/assets/uploads/98e7701c9e62fbba644e4b2aba184c95.png', description: 'Limpieza y desinfección.', category: 'Detergentes' },
{ id: 25, name: 'Sapolio Lavavajilla', price: 3.80, image: 'https://dojiw2m9tvv09.cloudfront.net/54185/product/22734818503.jpg', description: 'Lavavajilla concentrado.', category: 'Detergentes' },

{ id: 26, name: 'Coca Cola 1.5L', price: 7.00, image: 'https://www.shutterstock.com/image-photo/sao-paulo-brazil-april-17-600nw-2617117201.jpg', description: 'Gaseosa familiar.', category: 'Bebidas' },
{ id: 27, name: 'Sporade', price: 3.00, image: 'https://socialdrinks.pe/wp-content/uploads/2023/05/1130_1596483975-137-sporade-tropical-500-ml-jpg.jpeg', description: 'Bebida rehidratante.', category: 'Bebidas' },
{ id: 28, name: 'Frugos Durazno', price: 4.50, image: 'https://www.maryoriperu.com/wp-content/uploads/2019/04/Jugo-Frugos-Durazno-1-lt.jpg', description: 'Jugo sabor durazno.', category: 'Bebidas' },
{ id: 29, name: 'Yogurt Gloria', price: 5.20, image: 'https://corporacionliderperu.com/53197-large_default/gloria-yogurt-bt-x-946-gr-natural.jpg', description: 'Yogurt sabor vainilla .', category: 'Bebidas' },

{ id: 30, name: 'Manzana Roja', price: 4.80, image: 'https://img.magnific.com/psd-gratis/primer-plano-deliciosa-manzana_23-2151868338.jpg', description: 'Manzana fresca por kilo.', category: 'Frutas' },
{ id: 31, name: 'Naranja', price: 3.80, image: 'https://i.pinimg.com/222x/b2/38/62/b23862aabbcdc7146588c4fa641c7414.jpg', description: 'Naranja jugosa por kilo.', category: 'Frutas' },
{ id: 32, name: 'Uvas', price: 8.50, image: 'https://thumbs.dreamstime.com/b/uvas-verdes-2612059.jpg', description: 'Uvas frescas.', category: 'Frutas' },
{ id: 33, name: 'Piña', price: 6.00, image: 'https://www.gob.mx/cms/uploads/article/main_image/75312/pi_a.jpg', description: 'Piña dulce y natural.', category: 'Frutas' }
      ];

      // Lo guardamos en el LocalStorage
      localStorage.setItem(this.DB_PRODUCTS_KEY, JSON.stringify(mockProducts));
    }
  }
}
