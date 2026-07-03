import { HomepageEvidence } from "../types/shopify";
import { ScreenshotIssue } from "../types/screenshot";

export function analyzeScreenshot(
    evidence: HomepageEvidence
): ScreenshotIssue[] {

    const issues: ScreenshotIssue[] = [];

    if (evidence.ctas.length === 0) {

        issues.push({
            id:1,
            title:"Missing Primary CTA",
            description:"Hero section has no clear action button.",
            severity:"High",

            x:120,
            y:120,

            width:350,
            height:180
        });

    }

    if(evidence.navigation.length>20){

        issues.push({

            id:2,

            title:"Navigation Overloaded",

            description:"Too many menu items.",

            severity:"Medium",

            x:20,
            y:20,

            width:1200,
            height:70

        });

    }

    if(evidence.prices.length===0){

        issues.push({

            id:3,

            title:"Price Missing",

            description:"Homepage does not expose prices.",

            severity:"Medium",

            x:400,
            y:600,

            width:600,
            height:350

        });

    }

    if(!evidence.hasNewsletter){

        issues.push({

            id:4,

            title:"Newsletter Missing",

            description:"Footer lacks email capture.",

            severity:"Low",

            x:0,
            y:3200,

            width:1440,
            height:250

        });

    }

    return issues;

}