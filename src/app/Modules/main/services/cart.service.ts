import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root' // Esto permite que funcione en toda la app sin importar los módulos
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addToCart(product: Product): void {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentItems.push({ product, quantity: 1 });
    }
    this.cartItems.next([...currentItems]);
  }

  removeFromCart(productId: number): void {
    let currentItems = this.cartItems.getValue();
    currentItems = currentItems.filter(item => item.product.id !== productId);
    this.cartItems.next([...currentItems]);
  }

  clearCart(): void {
    this.cartItems.next([]);
  }

  getTotalPrice(): number {
    return this.cartItems.getValue().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getCartCount(): number {
    return this.cartItems.getValue().reduce((count, item) => count + item.quantity, 0);
  }
}