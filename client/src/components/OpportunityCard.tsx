interface Props {
  opportunity: any;
}

export default function OpportunityCard({ opportunity }: Props) {

  const confidence =
    Math.round((opportunity.confidence || 0) * 100);

  const impactColor =
    opportunity.impact === "High"
      ? "bg-red-100 text-red-700"
      : opportunity.impact === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (

    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold">

            {opportunity.title}

          </h2>

          <p className="text-gray-500 mt-1">

            {opportunity.reason}

          </p>

        </div>

        <span className={`px-3 py-1 rounded-full font-semibold ${impactColor}`}>

          {opportunity.impact}

        </span>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

        <div className="bg-slate-100 rounded-lg p-3">

          <p className="text-gray-500 text-sm">Confidence</p>

          <h3 className="text-xl font-bold">

            {confidence}%

          </h3>

        </div>

        <div className="bg-slate-100 rounded-lg p-3">

          <p className="text-gray-500 text-sm">Effort</p>

          <h3 className="text-xl font-bold">

            {opportunity.effort}

          </h3>

        </div>

        <div className="bg-slate-100 rounded-lg p-3">

          <p className="text-gray-500 text-sm">Impact</p>

          <h3 className="text-xl font-bold">

            {opportunity.impact}

          </h3>

        </div>

        <div className="bg-slate-100 rounded-lg p-3">

          <p className="text-gray-500 text-sm">Priority</p>

          <h3 className="text-xl font-bold">

            {confidence > 80 ? "P1" : confidence > 60 ? "P2" : "P3"}

          </h3>

        </div>

      </div>

      <div className="mt-6 rounded-xl bg-green-50 border border-green-200 p-4">

        <h3 className="font-bold text-green-700">

          Recommendation

        </h3>

        <p className="mt-2 text-gray-700">

          {opportunity.recommendation}

        </p>

      </div>

    </div>

  );

}