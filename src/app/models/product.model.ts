export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  currency: string;
  description: string;
  image: string;
  alt: string;
  badge?: string;
  badgeType?: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  originalPrice?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  isWishlist: boolean;
}
