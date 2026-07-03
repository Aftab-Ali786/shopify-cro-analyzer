export interface Product {
  title: string;
  url: string;
  price: string;
  compareAtPrice?: string;
  description: string;
  image: string;
  inStock: boolean;
  addToCartText: string;
  variants: string[];
  reviewsCount?: number;
}