import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isMobileMenuOpen = false;
  cartCount = 0;
  wishlistCount = 0;

  @ViewChild('menuBtn') menuBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('firstLink') firstLink!: ElementRef<HTMLAnchorElement>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(() => {
      this.cartCount = this.cartService.cartCount;
    });
    this.cartService.wishlist$.subscribe(() => {
      this.wishlistCount = this.cartService.wishlistCount;
    });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      setTimeout(() => this.firstLink.nativeElement.focus(), 100);
    } else {
      this.menuBtn.nativeElement.focus();
    }
  }

  closeMobileMenu(): void {
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      this.menuBtn.nativeElement.focus();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      this.menuBtn.nativeElement.focus();
    }
  }
}
