interface Props {
    screenshot?: string;
    issues?: any[];
}

export default function ScreenshotViewer({
    screenshot,
    issues = [],
}: Props) {

    if (!screenshot) {
        return (
            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-2xl font-bold mb-6">
                    Homepage Screenshot
                </h2>

                <div className="h-72 flex items-center justify-center bg-gray-100 rounded-xl">
                    Screenshot unavailable
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-6">
                Homepage Screenshot
            </h2>

            <div className="relative">

                <img
                    src={screenshot}
                    className="rounded-xl border w-full"
                />

                {issues.map((issue: any) => (

                    <div
                        key={issue.id}
                        className="absolute border-4 border-red-500"
                        style={{
                            left: issue.x,
                            top: issue.y,
                            width: issue.width,
                            height: issue.height,
                        }}
                    >
                        <div className="bg-red-600 text-white text-xs px-2 py-1">
                            {issue.title}
                        </div>
                    </div>

                ))}

            </div>

        </div>
    );
}