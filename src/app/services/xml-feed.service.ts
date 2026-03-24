import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class XmlFeedService {
  private xmlUrl = 'assets/products.xml';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get(this.xmlUrl, { responseType: 'text' }).pipe(
      map((xmlText) => this.parseXml(xmlText)),
      catchError((err) => {
        console.error('Failed to load XML feed:', err);
        return of([]);
      }),
    );
  }

  private parseXml(xmlText: string): Product[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
    const productNodes = xmlDoc.querySelectorAll('product');
    const products: Product[] = [];

    productNodes.forEach((node) => {
      const getText = (tag: string): string =>
        node.querySelector(tag)?.textContent?.trim() || '';

      const originalPriceText = getText('originalPrice');
      const product: Product = {
        id: parseInt(node.getAttribute('id') || '0', 10),
        name: getText('name'),
        category: getText('category'),
        price: parseFloat(getText('price')),
        currency: getText('currency'),
        description: getText('description'),
        image: getText('image'),
        alt: getText('alt'),
        badge: getText('badge'),
        badgeType: getText('badgeType'),
        inStock: getText('inStock') === 'true',
        rating: parseFloat(getText('rating')),
        reviews: parseInt(getText('reviews'), 10),
        originalPrice: originalPriceText
          ? parseFloat(originalPriceText)
          : undefined,
      };
      products.push(product);
    });

    return products;
  }
}
