import { useState } from "react";

interface Issue {
  id: number;
  title: string;
  description: string;
  severity: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Props {
  screenshot: string;
  issues: Issue[];
}

export default function HeatmapViewer({
  screenshot,
  issues,
}: Props) {

  const [selected, setSelected] = useState<number | null>(null);

  const getColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "border-red-600 bg-red-500/20";

      case "medium":
        return "border-yellow-500 bg-yellow-400/20";

      default:
        return "border-blue-600 bg-blue-500/20";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-4">
        CRO Heatmap
      </h2>

      {/* Legend */}

      <div className="flex gap-6 mb-5 text-sm">

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500"></div>
          High
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-400"></div>
          Medium
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-500"></div>
          Low
        </div>

      </div>

      <div className="relative border rounded-xl overflow-hidden">

        {screenshot ? (

          <img
            src={screenshot}
            alt="Homepage Screenshot"
            className="w-full"
          />

        ) : (

          <div className="h-96 flex items-center justify-center bg-gray-100">
            Screenshot unavailable
          </div>

        )}

        {issues?.map((issue) => (

          <div
            key={issue.id}
            onClick={() => setSelected(issue.id)}
            className={`absolute cursor-pointer border-4 rounded transition-all duration-300

            ${
              selected === issue.id
                ? "scale-105 shadow-2xl z-20"
                : "opacity-80 hover:opacity-100"
            }

            ${getColor(issue.severity)}
            `}
            style={{
              left: issue.x,
              top: issue.y,
              width: issue.width,
              height: issue.height,
            }}
          >

            <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-br">

              {issue.title}

            </div>

          </div>

        ))}

      </div>

      {/* Selected Issue */}

      {selected && (

        <div className="mt-6 rounded-xl bg-slate-100 p-5">

          {issues
            .filter((i) => i.id === selected)
            .map((issue) => (

              <div key={issue.id}>

                <h3 className="text-xl font-bold">

                  {issue.title}

                </h3>

                <p className="text-gray-600 mt-2">

                  {issue.description}

                </p>

                <div className="mt-4">

                  <span className="font-semibold">
                    Severity:
                  </span>{" "}

                  {issue.severity}

                </div>

              </div>

            ))}

        </div>

      )}

    </div>
  );
}