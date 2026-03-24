import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { XmlFeedService } from '../../services/xml-feed.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private xmlFeedService: XmlFeedService,
    public cartService: CartService,
    private title: Title,
    private meta: Meta,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        const id = parseInt(idParam, 10);
        this.loadProduct(id);
      } else {
        this.router.navigate(['/shop']);
      }
    });
  }

  loadProduct(id: number): void {
    this.isLoading = true;
    this.xmlFeedService.getProducts().subscribe((products) => {
      const p = products.find((prod) => prod.id === id);
      this.isLoading = false;
      if (p) {
        this.product = p;
        this.title.setTitle(`${p.name} — Island Adventure Gear`);
        this.meta.updateTag({ name: 'description', content: p.description });
      } else {
        this.router.navigate(['/shop']);
      }
    });
  }

  getStars(rating: number): string {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
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
}
