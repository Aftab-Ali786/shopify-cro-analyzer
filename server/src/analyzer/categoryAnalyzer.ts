import { HomepageEvidence } from "../types/shopify";

export function analyzeCategories(evidence: HomepageEvidence) {

    let design = 100;
    let navigation = 100;
    let trust = 100;
    let products = 100;
    let performance = 100;
    let mobile = 100;
    let seo = 100;

    // Navigation
    if (evidence.navigation.length > 12)
        navigation -= 20;

    if (!evidence.hasSearch)
        navigation -= 10;

    // Trust

    if (!evidence.trustSignals.reviews)
        trust -= 20;

    if (!evidence.trustSignals.shipping)
        trust -= 15;

    if (!evidence.trustSignals.returns)
        trust -= 15;

    if (!evidence.trustSignals.paymentIcons)
        trust -= 10;

    // Products

    if (evidence.products.length < 6)
        products -= 20;

    if (evidence.prices.length === 0)
        products -= 15;

    // Design

    if (evidence.imageCount < 10)
        design -= 20;

    if (evidence.ctas.length === 0)
        design -= 25;

    // Performance

    if (evidence.imageCount > 120)
        performance -= 20;

    // Mobile

    if (!evidence.hasCartDrawer)
        mobile -= 20;

    if (!evidence.hasNewsletter)
        mobile -= 10;

    // SEO

    if (!evidence.description)
        seo -= 20;

    if (!evidence.heroHeading)
        seo -= 20;

    return {
        Design: design,
        Navigation: navigation,
        Trust: trust,
        Products: products,
        Performance: performance,
        Mobile: mobile,
        SEO: seo
    };

}