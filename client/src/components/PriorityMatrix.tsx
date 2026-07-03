import {
    AlertTriangle,
    AlertCircle,
    Info,
    CheckCircle2,
} from "lucide-react";

interface Props {
    opportunities: any[];
}

export default function PriorityMatrix({
    opportunities = [],
}: Props) {

    const critical = opportunities.filter(
        (o) => o.impact?.toLowerCase() === "critical"
    );

    const high = opportunities.filter(
        (o) => o.impact?.toLowerCase() === "high"
    );

    const medium = opportunities.filter(
        (o) => o.impact?.toLowerCase() === "medium"
    );

    const low = opportunities.filter(
        (o) => o.impact?.toLowerCase() === "low"
    );

    const cards = [
        {
            title: "Critical",
            count: critical.length,
            color: "bg-red-50 border-red-300",
            text: "text-red-600",
            icon: AlertTriangle,
        },
        {
            title: "High",
            count: high.length,
            color: "bg-orange-50 border-orange-300",
            text: "text-orange-600",
            icon: AlertCircle,
        },
        {
            title: "Medium",
            count: medium.length,
            color: "bg-yellow-50 border-yellow-300",
            text: "text-yellow-600",
            icon: Info,
        },
        {
            title: "Low",
            count: low.length,
            color: "bg-green-50 border-green-300",
            text: "text-green-600",
            icon: CheckCircle2,
        },
    ];

    return (

        <section>

            <h2 className="text-3xl font-bold mb-6">
                CRO Priority Matrix
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                {cards.map((card) => {

                    const Icon = card.icon;

                    return (

                        <div
                            key={card.title}
                            className={`${card.color} border rounded-2xl shadow p-6`}
                        >

                            <div className="flex justify-between items-center">

                                <Icon
                                    className={card.text}
                                    size={30}
                                />

                                <span
                                    className={`text-4xl font-bold ${card.text}`}
                                >
                                    {card.count}
                                </span>

                            </div>

                            <h3 className="mt-6 text-xl font-semibold">
                                {card.title}
                            </h3>

                            <p className="text-gray-500 mt-2">
                                Opportunities
                            </p>

                        </div>

                    );

                })}

            </div>

        </section>

    );
}