import { HomepageEvidence } from "../types/shopify";

export function buildEvidence(data: HomepageEvidence) {
  return {
    store: {
      url: data.url,
      title: data.title,
      description: data.description,
      heroHeading: data.heroHeading,
      isShopify: data.isShopify,
    },

    navigation: {
      items: data.navigation,
      total: data.navigation.length,
    },

   products: {
  totalProducts: data.products.length,

  sampleProducts: data.products.map((product) => ({
    title: product.title,
    image: product.image,
    url: product.url,
    description: product.description,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    inStock: product.inStock,
    addToCartText: product.addToCartText,
    variants: product.variants.length,
    reviewsCount: product.reviewsCount,
  })),
},

    homepage: {
      imageCount: data.imageCount,

      ctas: data.ctas,

      prices: data.prices,

      collections: data.collectionLinks.length,
    },
    trustSignals: data.trustSignals,
    announcementBar: data.announcementBar,
      screenshots: data.screenshots  ,
      hasSearch: data.hasSearch,
      hasCartDrawer: data.hasCartDrawer,
      hasNewsletter: data.hasNewsletter,

  };
}
  