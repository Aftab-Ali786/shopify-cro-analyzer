import { Product } from "./products";

export interface HomepageEvidence {
  url: string;
  title: string;
  description: string;
  heroHeading: string;

  navigation: string[];

  ctas: string[];

  productLinks: string[];

  collectionLinks: string[];

  imageCount: number;

  imageUrls: string[];

  prices: string[];

  isShopify: boolean;

  products: Product[];

  trustSignals: {
  reviews: boolean;
  faq: boolean;
  shipping: boolean;
  returns: boolean;
  paymentIcons: boolean;
};
announcementBar: string;

hasSearch: boolean;

hasCartDrawer: boolean;

hasNewsletter: boolean;
screenshots: string[];
}

