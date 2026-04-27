import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CartItem } from "../Interfaces/ICarrito.interface";
import { Product } from "../Interfaces/IProduct.interface";


@Injectable({providedIn:'root'})
export class CarritoService{

private cartItems = new BehaviorSubject<CartItem[]>(this.loadCart());
  public cartItems$ = this.cartItems.asObservable();

  addToCart(product: Product) {
    const currentItems = this.cartItems.value;
    const existing = currentItems.find(item => item.product.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      currentItems.push({ product, quantity: 1 });
    }
    this.updateCart(currentItems);
  }

  removeFromCart(productId: number) {
    const currentItems = this.cartItems.value.filter(item => item.product.id !== productId);
    this.updateCart(currentItems);
  }

  clearCart() {
    this.updateCart([]);
  }

  getTotalPrice(): number {
    return this.cartItems.value.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  private updateCart(items: CartItem[]) {
    this.cartItems.next(items);
    localStorage.setItem('carrito', JSON.stringify(items));
  }

  private loadCart(): CartItem[] {
    const saved = localStorage.getItem('carrito');
    return saved ? JSON.parse(saved) : [];
  }
}
