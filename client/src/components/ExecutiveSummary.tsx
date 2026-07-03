interface Props {
  evidence: any;
  ruleScore: number;
  aiScore: number;
}

export default function ExecutiveSummary({
  evidence,
  ruleScore,
  aiScore,
}: Props) {
  const status =
    ruleScore >= 85
      ? "Excellent"
      : ruleScore >= 70
      ? "Good"
      : ruleScore >= 50
      ? "Average"
      : "Needs Improvement";

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-3xl font-bold">
            Executive Summary
          </h2>

          <p className="text-gray-500 mt-2">
            Quick overview of your Shopify store health.
          </p>

        </div>

        <div
          className={`px-5 py-2 rounded-full font-semibold
          ${
            ruleScore >= 85
              ? "bg-green-100 text-green-700"
              : ruleScore >= 70
              ? "bg-blue-100 text-blue-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {status}
        </div>

      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mt-8">

        <SummaryItem
          title="Platform"
          value={evidence.store.isShopify ? "Shopify" : "Unknown"}
        />

        <SummaryItem
          title="Products"
          value={evidence.products.totalProducts}
        />

        <SummaryItem
          title="Collections"
          value={evidence.homepage.collections}
        />

        <SummaryItem
          title="Images"
          value={evidence.homepage.imageCount}
        />

        <SummaryItem
          title="Navigation"
          value={evidence.navigation.total}
        />

        <SummaryItem
          title="AI Score"
          value={`${aiScore}/100`}
        />

      </div>

    </div>
  );
}

function SummaryItem({
  title,
  value,
}: {
  title: string;
  value: any;
}) {
  return (
    <div className="bg-slate-50 rounded-xl p-5 text-center">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className="text-3xl font-bold mt-2">
        {value}
      </h3>

    </div>
  );
}