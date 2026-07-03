interface Props {
  title: string;
  score: number;
  color: string;
}

export default function ProgressCard({
  title,
  score,
  color,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex justify-between mb-3">

        <h3 className="font-semibold text-lg">
          {title}
        </h3>

        <span className="font-bold text-xl">
          {score}%
        </span>

      </div>

      <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

        <div
          className={`${color} h-full rounded-full transition-all duration-1000`}
          style={{
            width: `${score}%`,
          }}
        />

      </div>

      <div className="flex justify-between mt-2 text-sm text-gray-500">

        <span>0</span>

        <span>50</span>

        <span>100</span>

      </div>

    </div>
  );
}