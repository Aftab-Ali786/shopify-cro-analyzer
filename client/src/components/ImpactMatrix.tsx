interface Props {
  opportunities: any[];
}

export default function ImpactMatrix({ opportunities }: Props) {
  if (!opportunities?.length) return null;

  const getColor = (impact: string) => {
    switch (impact?.toLowerCase()) {
      case "high":
        return "bg-red-100 border-red-400 text-red-700";
      case "medium":
        return "bg-yellow-100 border-yellow-400 text-yellow-700";
      default:
        return "bg-green-100 border-green-400 text-green-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Quick Wins Priority Matrix
      </h2>

      <div className="space-y-4">

        {opportunities.map((item: any, index: number) => (

          <div
            key={index}
            className={`rounded-xl border-2 p-4 ${getColor(item.impact)}`}
          >

            <div className="flex justify-between">

              <h3 className="font-bold">
                {item.title}
              </h3>

              <span className="font-semibold">
                {item.impact}
              </span>

            </div>

            <div className="mt-2 text-sm">

              Confidence:
              <b>
                {" "}
                {Math.round((item.confidence || 0) * 100)}%
              </b>

              {" • "}

              Effort:
              <b> {item.effort}</b>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}