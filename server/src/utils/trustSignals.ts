export function detectTrustSignals(html: string) {

    return {

        reviews:

            html.includes("reviews") ||

            html.includes("judge.me") ||

            html.includes("yotpo"),

        faq:

            html.includes("FAQ"),

        paymentIcons:

            html.includes("visa") ||

            html.includes("mastercard"),

        returns:

            html.includes("Free Returns"),

        shipping:

            html.includes("Free Shipping")

    };

}