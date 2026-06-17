import { Observable, of } from "rxjs";
import { Product } from "../Interfaces/IProduct.interface";
import { Injectable } from "@angular/core";



@Injectable({providedIn:'root'})
export class ProductService{

  private readonly DB_PRODUCTS_KEY= 'donPepe_products';

  constructor(){
    const existingData = localStorage.getItem(this.DB_PRODUCTS_KEY);

    if (existingData) {
      const productos = JSON.parse(existingData) as Product[];
      const productosNormalizados = this.normalizarCategorias(productos);

      if (JSON.stringify(productosNormalizados) !== JSON.stringify(productos)) {
        localStorage.setItem(this.DB_PRODUCTS_KEY, JSON.stringify(productosNormalizados));
      }
    } else {
      this.cargarProductosPorDefecto();
    }
  }

  /**METODO PARA QUE EL CATALOGO LEA LOS PRODUCTOS */
  getProductos(): Observable<Product[]>{

    const data = localStorage.getItem(this.DB_PRODUCTS_KEY);
    const productos = data ? JSON.parse(data) : [];
    return of(this.normalizarCategorias(productos));
  }

  /*METODO PARA QUE EL ADMIN GUARDE CAMBIOS */
  saveProducts(productos: Product[]): void {
    localStorage.setItem(this.DB_PRODUCTS_KEY, JSON.stringify(productos));
  }

  private normalizarCategorias(productos: Product[]): Product[] {
    return productos.map(producto => {
      if (producto.id === 4 || producto.name === 'Leche Deslactosada Laive') {
        return { ...producto, category: 'Lácteos' };
      }

      if (producto.id === 29 || producto.name === 'Yogurt Gloria') {
        return { ...producto, category: 'Lácteos' };
      }

      return producto;
    });
  }

  /**DATOS INICIALES */
  private cargarProductosPorDefecto(){
    if(!localStorage.getItem(this.DB_PRODUCTS_KEY)){
      const mockProducts: Product[] = [

        { id: 1, name: 'Avena Integral', price: 4.50, image: 'https://ecovalle.pe/wp-content/uploads/2022/08/HOJUELAS-DE-AVENA-NACIONAL-250-G.jpg', description: 'Avena rica en fibra y nutrientes.', category: 'Cereales' },

{ id: 2, name: 'Galletas Field Vainilla', price: 2.80, image: 'https://oechsle.vteximg.com.br/arquivos/ids/1890456-1000-1000/image-7db686787e2c426897ab06f991e87b77.jpg?v=637495395967800000', description: 'Galletas dulces sabor vainilla.', category: 'Snacks' },

{ id: 3, name: 'Detergente ACE', price: 4.50, image: 'https://aceleralastatic.nyc3.cdn.digitaloceanspaces.com/files/uploads/1499/1771281526-26-1602720046-103-img-8816-ok-png-png.png', description: 'Detergente poderoso contra manchas.', category: 'Detergentes' },

{ id: 4, name: 'Leche Deslactosada Laive', price: 4.20, image: 'https://storage.googleapis.com/web-laive-storage/Media//4.%20Laive%20Leche%20Sin%20Lactosa%20lista%20para%20consumir%20946%20ml%20v2.jpg', description: 'Leche sin lactosa ideal para el desayuno.', category: 'Lácteos' },

{ id: 5, name: 'Fresas Frescas', price: 15.00, image: 'https://png.pngtree.com/png-vector/20250227/ourmid/pngtree-box-of-strawberries-tasty-box-vitamines-png-image_15621124.png', description: 'Fresas naturales y jugosas.', category: 'Frutas' },

{ id: 6, name: 'Agua Mineral', price: 1.50, image: 'https://resources.coca-colaentuhogar.com/media/catalog/product/c/i/cie-natu-nor-pet-1l-6pz.png', description: 'Agua purificada y refrescante.', category: 'Bebidas' },

{ id: 7, name: 'Papas Lays Clásicas', price: 2.50, image: 'https://aceleralastatic.nyc3.cdn.digitaloceanspaces.com/files/uploads/1499/1596226959-77-frito-lay-papas-lays-clasicas-70-jpg.jpg', description: 'Papas crocantes sabor clásico.', category: 'Snacks' },

{ id: 8, name: 'Cereal Ángel Mel', price: 5.50, image: 'https://images.rappi.pe/products/1719005557489_1719005555337_1719005550832.png', description: 'Cereal de maíz con toque de miel.', category: 'Cereales' },

{ id: 9, name: 'Inca Kola 1.5L', price: 7.50, image: 'https://www.donbelisario.com.pe/media/catalog/product/2/1/2146463136.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700&format=jpeg', description: 'La bebida peruana favorita.', category: 'Bebidas' },

{ id: 10, name: 'Plátano Seda', price: 3.00, image: 'https://arandanosdelhuerto.com/wp-content/uploads/2021/10/platano-seda-normal_1000x1000-1-450x450.png', description: 'Plátanos frescos y nutritivos.', category: 'Frutas' },

{ id: 11, name: 'Jabón Bolívar', price: 5.50, image: 'https://corporacionliderperu.com/51237-large_default/bolivar-jabon-vida-x-190-gr-cuidado-total.jpg', description: 'Jabón ideal para el lavado de ropa.', category: 'Detergentes' },

{ id: 12, name: 'Cereal Fresa', price: 5.50, image: 'https://dojiw2m9tvv09.cloudfront.net/49572/product/freziaalmohada0272.jpg', description: 'Cereal sabor fresa con almohaditas rellenas.', category: 'Cereales' },

{ id: 13, name: 'Galletas Morochas', price: 1.20, image: 'https://grandcentral.pe/wp-content/uploads/2025/09/GCG086-M1.jpg', description: 'Galletas rellenas bañadas en chocolate.', category: 'Snacks' },

{ id: 14, name: 'Angel Flakes', price: 6.80, image: 'https://perufarma.com.pe/wp-content/uploads/2022/02/4.png', description: 'Cereal de hojuelas crocantes.', category: 'Cereales' },

{ id: 15, name: 'Avena Quaker', price: 5.90, image: 'https://www.pngitem.com/pimgs/b/9-92169_quaker-oats-png.png', description: 'Avena nutritiva para un desayuno saludable.', category: 'Cereales' },

{ id: 16, name: 'Cereal Chock', price: 5.50, image: 'https://corporacionliderperu.com/53173-large_default/angel-hojuelas-de-maiz-bl-x-130-gr-chock.jpg', description: 'Cereal dulce con sabor a chocolate.', category: 'Cereales' },

{ id: 17, name: 'Chocapic', price: 7.20, image: 'https://m.media-amazon.com/images/I/91KU4hxXXCL._SX679_.jpg', description: 'Cereal crocante sabor chocolate.', category: 'Cereales' },

{ id: 18, name: 'Doritos Queso', price: 3.50, image: 'https://m.media-amazon.com/images/I/71ql7g8DRkL._AC_UL960_QL65_.jpg', description: 'Snack crocante sabor queso.', category: 'Snacks' },

{ id: 19, name: 'Cheetos', price: 2.80, image: 'https://wallpapers.com/images/hd/cheetos-crunchy-snack-package-qd94haiam77ldxj6.png', description: 'Bocaditos de maíz con queso.', category: 'Snacks' },

{ id: 20, name: 'Chizitos', price: 1.50, image: 'https://miamarket.pe/assets/uploads/1cfed3b10ead9c36e3bd8c43a7a91823.jpg', description: 'Snack ligero y crocante.', category: 'Snacks' },

{ id: 21, name: 'Piqueo Snax', price: 4.20, image: 'https://plazavea.vteximg.com.br/arquivos/ids/32427760-1000-1000/20565469.jpg', description: 'Mix variado de snacks salados.', category: 'Snacks' },

{ id: 22, name: 'Ariel Líquido', price: 12.90, image: 'https://www.molinasecaonline.com/image/cache/data/Limpieza/ariel%20liquido%20actilift-882x882.jpg', description: 'Detergente líquido para ropa.', category: 'Detergentes' },

{ id: 23, name: 'Suavizante Downy', price: 8.90, image: 'https://www.miamarket.pe/assets/uploads/7ba1b85874a59f18135ea3bccd951e01.jpg', description: 'Suaviza y perfuma la ropa.', category: 'Detergentes' },

{ id: 24, name: 'Lejía Clorox', price: 4.00, image: 'https://miamarket.pe/assets/uploads/98e7701c9e62fbba644e4b2aba184c95.png', description: 'Ideal para limpieza y desinfección.', category: 'Detergentes' },

{ id: 25, name: 'Sapolio Lavavajilla', price: 3.80, image: 'https://dojiw2m9tvv09.cloudfront.net/54185/product/22734818503.jpg', description: 'Lavavajilla concentrado para cocina.', category: 'Detergentes' },

{ id: 26, name: 'Coca Cola 1.5L', price: 7.00, image: 'https://www.shutterstock.com/image-photo/sao-paulo-brazil-april-17-600nw-2617117201.jpg', description: 'Gaseosa refrescante familiar.', category: 'Bebidas' },

{ id: 27, name: 'Sporade Tropical', price: 3.00, image: 'https://socialdrinks.pe/wp-content/uploads/2023/05/1130_1596483975-137-sporade-tropical-500-ml-jpg.jpeg', description: 'Bebida hidratante sabor tropical.', category: 'Bebidas' },

{ id: 28, name: 'Frugos Durazno', price: 4.50, image: 'https://www.maryoriperu.com/wp-content/uploads/2019/04/Jugo-Frugos-Durazno-1-lt.jpg', description: 'Jugo refrescante sabor durazno.', category: 'Bebidas' },

{ id: 29, name: 'Yogurt Gloria', price: 5.20, image: 'https://corporacionliderperu.com/53197-large_default/gloria-yogurt-bt-x-946-gr-natural.jpg', description: 'Yogurt cremoso sabor vainilla.', category: 'Lácteos' },

{ id: 30, name: 'Manzana Roja', price: 4.80, image: 'https://img.magnific.com/psd-gratis/primer-plano-deliciosa-manzana_23-2151868338.jpg', description: 'Manzanas frescas por kilo.', category: 'Frutas' },

{ id: 31, name: 'Naranja Dulce', price: 3.80, image: 'https://i.pinimg.com/222x/b2/38/62/b23862aabbcdc7146588c4fa641c7414.jpg', description: 'Naranjas jugosas y frescas.', category: 'Frutas' },

{ id: 32, name: 'Uvas Verdes', price: 8.50, image: 'https://thumbs.dreamstime.com/b/uvas-verdes-2612059.jpg', description: 'Uvas frescas y dulces.', category: 'Frutas' },

{ id: 33, name: 'Piña Natural', price: 6.00, image: 'https://www.gob.mx/cms/uploads/article/main_image/75312/pi_a.jpg', description: 'Piña dulce y tropical.', category: 'Frutas' }
      ];

      // Lo guardamos en el LocalStorage
      localStorage.setItem(this.DB_PRODUCTS_KEY, JSON.stringify(mockProducts));
    }
  }
}
