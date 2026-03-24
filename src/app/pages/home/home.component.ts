import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { XmlFeedService } from '../../services/xml-feed.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  isLoading = true;

  constructor(
    private title: Title,
    private meta: Meta,
    private xmlFeedService: XmlFeedService,
    public cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.title.setTitle("Island Adventure Gear — Jamaica's Outdoor Store");
    this.meta.updateTag({
      name: 'description',
      content:
        "Discover premium outdoor gear for hiking, camping, and climbing in Jamaica. Island Adventure Gear — your gateway to Jamaica's great outdoors.",
    });

    this.xmlFeedService.getProducts().subscribe((products) => {
      this.featuredProducts = products.slice(0, 3);
      this.isLoading = false;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  addToWishlist(product: Product): void {
    this.cartService.addToWishlist(product);
  }

  isInWishlist(id: number): boolean {
    return this.cartService.isInWishlist(id);
  }

  getStars(rating: number): string {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  }

  formatPrice(p: number): string {
    return `$${p.toLocaleString()} JMD`;
  }
}
