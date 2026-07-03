interface Props {
  product: {
    title: string;
    image?: string;
    price?: string;
  };
}

export default function ProductCard({ product }: Props) {
  // Clean up Shopify's relative protocol string if it exists
  const getCleanImageUrl = (src?: string) => {
    if (!src) return "https://placehold.co/300x300";
    if (src.startsWith("//")) return `https:${src}`;
    return src;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-100">
      <img
        src={getCleanImageUrl(product.image)}
        alt={product.title || "Shopify Product"}
        className="rounded-lg h-52 w-full object-cover bg-gray-50"
        onError={(e) => {
          // Fallback safeguard if a hotlink expires or blocks CORS
          (e.currentTarget as HTMLImageElement).src = "https://placehold.co/300x300";
        }}
      />

      <h2 className="font-semibold mt-3 text-gray-800 line-clamp-1">
        {product.title}
      </h2>

      <p className="text-green-600 font-bold mt-1">
        {product.price || "Price unavailable"}
      </p>
    </div>
  );
}