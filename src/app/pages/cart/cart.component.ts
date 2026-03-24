import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/product.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  wishlistItems: CartItem[] = [];
  activeTab: 'cart' | 'wishlist' = 'cart';
  orderPlaced = false;

  constructor(
    private title: Title,
    private meta: Meta,
    public cartService: CartService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Cart & Wishlist — Island Adventure Gear');
    this.meta.updateTag({
      name: 'description',
      content: 'View your shopping cart and wishlist at Island Adventure Gear.',
    });

    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
    });
    this.cartService.wishlist$.subscribe((items) => {
      this.wishlistItems = items;
    });
  }

  getTotal(): string {
    return `$${this.cartService.getCartTotal().toLocaleString()} JMD`;
  }

  updateQty(productId: number, event: Event): void {
    const val = parseInt((event.target as HTMLInputElement).value, 10);
    this.cartService.updateQuantity(productId, val);
  }

  removeFromCart(id: number): void {
    this.cartService.removeFromCart(id);
  }

  removeFromWishlist(id: number): void {
    this.cartService.removeFromWishlist(id);
  }

  moveToCart(item: CartItem): void {
    this.cartService.addToCart(item.product);
    this.cartService.removeFromWishlist(item.product.id);
  }

  placeOrder(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/cart' } });
      return;
    }

    this.cartService.clearCart();
    this.orderPlaced = true;
  }

  onTabKeydown(
    event: KeyboardEvent,
    currentTab: 'cart' | 'wishlist',
    otherTabRef: HTMLButtonElement,
  ): void {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const nextTab = currentTab === 'cart' ? 'wishlist' : 'cart';
      this.activeTab = nextTab;
      setTimeout(() => otherTabRef.focus(), 0);
    }
  }
}
