import Header from "./Header";
import TrustSignalsCard from "./TrustSignalsCard";
import StrengthCard from "./StrengthCard";
import WeaknessCard from "./WeaknessCard";
import NavigationCard from "./NavigationCard";
import OpportunityCard from "./OpportunityCard";
import ProductCard from "./ProductCard";
import StatsCard from "./StatsCard";
import ExecutiveSummary from "./ExecutiveSummary";
import ProgressCard from "./ProgressCard";
import PriorityMatrix from "./PriorityMatrix";
import ImpactMatrix from "./ImpactMatrix";
import HeatmapViewer from "./HeatmapViewer";
import IssueSidebar from "./IssueSidebar";
import CategoryScoreCard from "./CategoryScoreCard";
import StoreCard from "./StoreCard";

interface Props {
  data: any;
}

export default function CRODashboard({ data }: Props) {
  if (!data) return null;

  const { evidence, ruleReport, aiReport } = data;

  return (
    <div className="min-h-screen bg-slate-50">

     <Header />

<div className="max-w-7xl mx-auto px-6 py-10 space-y-8">

  {/* ================= EXECUTIVE SUMMARY ================= */}

  <ExecutiveSummary
    evidence={evidence}
    ruleScore={ruleReport.overallScore}
    aiScore={aiReport.overallScore}
  />
   
  <section>

<div className="grid lg:grid-cols-2 gap-6">

<CategoryScoreCard

scores={data.categoryScores}

/>



<div className="space-y-6">

<ProgressCard
title="Rule Score"
score={ruleReport.overallScore}
color="bg-blue-600"
/>

<ProgressCard
title="AI Score"
score={aiReport.overallScore}
color="bg-green-600"
/>

</div>

</div>

</section> 

<section>

<h2 className="text-3xl font-bold mb-6">

Visual CRO Analysis

</h2>

<div className="grid lg:grid-cols-3 gap-6">

<div className="lg:col-span-2">

<HeatmapViewer

screenshot={evidence.screenshot}

issues={data.screenshotIssues||[]}

/>

</div>

<IssueSidebar

issues={data.screenshotIssues||[]}

/>

</div>

</section>
    
  

  {/* ================= STORE DETAILS ================= */}

<section className="grid lg:grid-cols-2 gap-6">

<StoreCard
store={evidence.store}
/>

<TrustSignalsCard
trustSignals={evidence.trustSignals}
announcementBar={evidence.announcementBar}
hasSearch={evidence.hasSearch}
hasCartDrawer={evidence.hasCartDrawer}
hasNewsletter={evidence.hasNewsletter}
/>

</section>

<section>

<ImpactMatrix
opportunities={aiReport.opportunities}
/>

</section>

<PriorityMatrix
    opportunities={aiReport.opportunities}
/>
        {/* ================= Strength ================= */}

        <section className="grid lg:grid-cols-2 gap-6">

          <StrengthCard
            strengths={aiReport.strengths || []}
          />

          <WeaknessCard
            weaknesses={aiReport.weaknesses || []}
          />

        </section>

        {/* ================= Quick Stats ================= */}

        <section>

          <h2 className="text-2xl font-bold mb-5">

            Store Statistics

          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <StatsCard
              title="Images"
              value={evidence.homepage.imageCount}
            />

            <StatsCard
              title="Navigation"
              value={evidence.navigation.total}
            />

            <StatsCard
              title="Collections"
              value={evidence.homepage.collections}
            />

            <StatsCard
              title="Products"
              value={evidence.products.totalProducts}
            />

          </div>

        </section>

        {/* ================= Navigation ================= */}

        <NavigationCard
          items={evidence.navigation.items}
        />

        {/* ================= Products ================= */}

        <section>

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-3xl font-bold">

              Featured Products

            </h2>

            <span className="text-gray-500">

              {evidence.products.totalProducts} Products

            </span>

          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">

            {evidence.products.sampleProducts.map(
              (product: any, index: number) => (
                <ProductCard
                  key={index}
                  product={product}
                />
              )
            )}

          </div>

        </section>

        {/* ================= Opportunities ================= */}

        <section>

          <h2 className="text-3xl font-bold mb-6">

            Prioritized CRO Opportunities

          </h2>

          <div className="space-y-6">

            {aiReport.opportunities?.map(
              (opportunity: any, index: number) => (

                <OpportunityCard
                  key={index}
                  opportunity={opportunity}
                />

              )
            )}

          </div>

        </section>

      </div>

    </div>
  );
}