import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private wishlistItems = new BehaviorSubject<CartItem[]>([]);

  cart$ = this.cartItems.asObservable();
  wishlist$ = this.wishlistItems.asObservable();

  get cartCount(): number {
    return this.cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
  }

  get wishlistCount(): number {
    return this.wishlistItems.value.length;
  }

  addToCart(product: Product): void {
    const current = this.cartItems.value;
    const existing = current.find(
      (item) => item.product.id === product.id && !item.isWishlist,
    );
    if (existing) {
      existing.quantity++;
      this.cartItems.next([...current]);
    } else {
      this.cartItems.next([
        ...current,
        { product, quantity: 1, isWishlist: false },
      ]);
    }
  }

  addToWishlist(product: Product): boolean {
    const current = this.wishlistItems.value;
    const existing = current.find((item) => item.product.id === product.id);
    if (!existing) {
      this.wishlistItems.next([
        ...current,
        { product, quantity: 1, isWishlist: true },
      ]);
      return true;
    }
    // Already in wishlist — remove it (toggle)
    this.wishlistItems.next(
      current.filter((item) => item.product.id !== product.id),
    );
    return false;
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistItems.value.some(
      (item) => item.product.id === productId,
    );
  }

  removeFromCart(productId: number): void {
    this.cartItems.next(
      this.cartItems.value.filter((item) => item.product.id !== productId),
    );
  }

  removeFromWishlist(productId: number): void {
    this.wishlistItems.next(
      this.wishlistItems.value.filter((item) => item.product.id !== productId),
    );
  }

  updateQuantity(productId: number, quantity: number): void {
    const current = this.cartItems.value;
    const item = current.find((i) => i.product.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.cartItems.next([...current]);
    }
  }

  getCartTotal(): number {
    return this.cartItems.value.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  }

  clearCart(): void {
    this.cartItems.next([]);
  }
}
