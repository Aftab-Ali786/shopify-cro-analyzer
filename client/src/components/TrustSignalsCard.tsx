import {
    CheckCircle,
    XCircle,
    Truck,
    RotateCcw,
    CreditCard,
    HelpCircle,
    Star,
    Search,
    ShoppingCart,
    Mail,
} from "lucide-react";

interface Props {
    trustSignals: any;
    announcementBar?: string;
    hasSearch?: boolean;
    hasCartDrawer?: boolean;
    hasNewsletter?: boolean;
}

export default function TrustSignalsCard({
    trustSignals,
    announcementBar,
    hasSearch,
    hasCartDrawer,
    hasNewsletter,
}: Props) {

    const items = [
        {
            label: "Shipping Information",
            value: trustSignals.shipping,
            icon: Truck,
        },
        {
            label: "Return Policy",
            value: trustSignals.returns,
            icon: RotateCcw,
        },
        {
            label: "FAQ Section",
            value: trustSignals.faq,
            icon: HelpCircle,
        },
        {
            label: "Customer Reviews",
            value: trustSignals.reviews,
            icon: Star,
        },
        {
            label: "Payment Icons",
            value: trustSignals.paymentIcons,
            icon: CreditCard,
        },
        {
            label: "Search",
            value: hasSearch,
            icon: Search,
        },
        {
            label: "Cart Drawer",
            value: hasCartDrawer,
            icon: ShoppingCart,
        },
        {
            label: "Newsletter",
            value: hasNewsletter,
            icon: Mail,
        },
    ];

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

            <h2 className="text-2xl font-bold mb-2">
                Trust & UX Signals
            </h2>

            <p className="text-gray-500 mb-6">
                Signals that improve customer confidence and conversion.
            </p>

            <div className="space-y-4">

                {items.map((item, index) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={index}
                            className="flex items-center justify-between bg-slate-50 rounded-xl p-4"
                        >

                            <div className="flex items-center gap-4">

                                <Icon
                                    className="text-blue-600"
                                    size={22}
                                />

                                <span className="font-medium">
                                    {item.label}
                                </span>

                            </div>

                            {item.value ? (

                                <span className="flex items-center gap-2 text-green-600 font-semibold">

                                    <CheckCircle size={20} />

                                    Present

                                </span>

                            ) : (

                                <span className="flex items-center gap-2 text-red-500 font-semibold">

                                    <XCircle size={20} />

                                    Missing

                                </span>

                            )}

                        </div>

                    );

                })}

            </div>

            {announcementBar && (

                <div className="mt-8 rounded-xl bg-blue-50 border border-blue-200 p-4">

                    <h3 className="font-semibold mb-2">

                        Announcement Bar

                    </h3>

                    <p className="text-gray-700">

                        {announcementBar}

                    </p>

                </div>

            )}

        </div>
    );
}