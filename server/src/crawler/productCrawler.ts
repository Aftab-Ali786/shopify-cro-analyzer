import { Product } from "../types/products";

export async function crawlProduct(url: string): Promise<Product> {
  try {
    // 1. Strip query params and append `.js` to target Shopify's native product endpoint
    const cleanUrl = url.split("?")[0];
    const jsonUrl = cleanUrl.endsWith(".js") ? cleanUrl : `${cleanUrl}.js`;

    // 2. Fetch the clean, server-side data payload directly
    const response = await fetch(jsonUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Shopify JSON endpoint returned status: ${response.status}`);
    }

    const data = await response.json();

    // 3. Formulate prices cleanly (Shopify stores prices in cents, e.g., 12500 = $125.00)
    const formattedPrice = data.price 
      ? `$${(data.price / 100).toFixed(2)}` 
      : "Price unavailable";

    // 4. Map the response fields directly to your structure rules
    return {
      title: data.title || "Unknown Product",
      url,
      description: data.description ? data.description.replace(/<[^>]*>/g, "").trim() : "", // Cleans out raw HTML tags
      image: data.featured_image ? `https:${data.featured_image}` : "",
      price: formattedPrice,
      addToCartText: data.available ? "Add to Cart" : "Sold Out",
      variants: data.variants ? data.variants.map((v: any) => v.title) : [],
      inStock: data.available ?? false,
    };

  } catch (error) {
    console.error(`Failed native JSON extraction for: ${url}. Triggering lightweight fallback structure.`);
    
    // Fallback item so a broken single link doesn't crash the homepage loop runner
    return {
      title: "Featured Product Item",
      url,
      description: "",
      image: "",
      price: "Price unavailable",
      addToCartText: "View Product",
      variants: [],
      inStock: true,
    };
  }
}