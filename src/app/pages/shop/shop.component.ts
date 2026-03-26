import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { XmlFeedService } from '../../services/xml-feed.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit, OnDestroy {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading = true;
  xmlLoaded = false;

  searchQuery = '';
  selectedCategory = 'all';
  priceMin = 0;
  priceMax = 20000;
  sortBy = 'default';

  categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'hiking', label: '🥾 Hiking' },
    { value: 'camping', label: '⛺ Camping' },
    { value: 'climbing', label: '🧗 Climbing' },
  ];

  private routeSub!: Subscription;

  constructor(
    private title: Title,
    private meta: Meta,
    private xmlFeedService: XmlFeedService,
    public cartService: CartService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Shop — Island Adventure Gear');
    this.meta.updateTag({
      name: 'description',
      content:
        'Browse our full collection of hiking, camping, and climbing gear. Filter by activity or price. Free island-wide delivery on orders over $10,000 JMD.',
    });

    this.routeSub = this.route.queryParams.subscribe((params) => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
    });

    this.xmlFeedService.getProducts().subscribe((products) => {
      this.allProducts = products;
      this.filteredProducts = products;
      this.xmlLoaded = true;
      this.isLoading = false;
      this.applyFilters();
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  applyFilters(): void {
    let result = [...this.allProducts];

    if (this.selectedCategory !== 'all') {
      result = result.filter((p) => p.category === this.selectedCategory);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    result = result.filter(
      (p) => p.price >= this.priceMin && p.price <= this.priceMax,
    );

    switch (this.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    this.filteredProducts = result;
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.priceMin = 0;
    this.priceMax = 20000;
    this.sortBy = 'default';
    this.applyFilters();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  toggleWishlist(product: Product): void {
    this.cartService.addToWishlist(product);
  }

  isInWishlist(id: number): boolean {
    return this.cartService.isInWishlist(id);
  }

  refreshFromXml(): void {
    this.isLoading = true;
    this.xmlLoaded = false;
    this.xmlFeedService.getProducts(true).subscribe((products) => {
      this.allProducts = products;
      this.applyFilters();
      this.xmlLoaded = true;
      this.isLoading = false;
    });
  }

  getStars(rating: number): string {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  }

  formatPrice(p: number): string {
    return `$${p.toLocaleString()} JMD`;
  }
}
