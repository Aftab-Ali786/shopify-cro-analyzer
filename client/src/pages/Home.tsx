import Navbar from "../components/Navbar";
import UrlInput from "../components/UrlInput";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center mt-20 px-4">
        <h1 className="text-5xl font-bold mb-4">
          Shopify CRO Opportunity Engine
        </h1>

        <p className="text-gray-600 mb-10 text-center max-w-2xl">
          Analyze any Shopify store using AI and discover
          conversion optimization opportunities backed by
          real website evidence.
        </p>

        <UrlInput />
      </div>
    </>
  );
}