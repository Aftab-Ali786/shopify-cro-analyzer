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
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import GaugeChart from "../chates/GaugeChart";
import CategoryBarChart from "../chates/CategoryBarChart";
import SeverityPieChart from "../chates/SeverityPieChart";
import TrustRadarChart from "../chates/TrustRadarChart";

interface Props {
  data: any;
}

export default function CRODashboard({ data }: Props) {
  if (!data) return null;

  const { evidence, ruleReport, aiReport } = data;

  return (
    <div
      className="min-h-screen bg-gradient-to-br
from-slate-100
via-white
to-indigo-50"
    >
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* ================= EXECUTIVE SUMMARY ================= */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ExecutiveSummary
            evidence={evidence}
            ruleScore={ruleReport.overallScore}
            aiScore={aiReport.overallScore}
          />
        </motion.div>
        <section>

<SectionHeader
title="Analytics Dashboard"
subtitle="Visual insights generated from the crawl"
/>

<div className="grid lg:grid-cols-2 gap-6">

<GaugeChart
score={ruleReport.overallScore}
/>

<CategoryBarChart
scores={data.categoryScores}
/>

<SeverityPieChart
issues={data.screenshotIssues || []}
/>

<TrustRadarChart
trust={evidence.trustSignals}
/>

</div>

</section>

        {/* ================= SCORES ================= */}
        <section>
          <div className="grid lg:grid-cols-2 gap-6">
            <CategoryScoreCard scores={data.categoryScores} />

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
<SectionHeader
    title="Visual CRO Analysis"
    subtitle="Homepage screenshot with detected CRO issues"
/>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <HeatmapViewer
                screenshot={evidence.screenshot}
                issues={data.screenshotIssues || []}
              />
            </div>

            <IssueSidebar issues={data.screenshotIssues || []} />
          </div>
        </section>

        {/* ================= STORE DETAILS ================= */}

        <section className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <StoreCard store={evidence.store} />
          </motion.div>

          <TrustSignalsCard
            trustSignals={evidence.trustSignals}
            announcementBar={evidence.announcementBar}
            hasSearch={evidence.hasSearch}
            hasCartDrawer={evidence.hasCartDrawer}
            hasNewsletter={evidence.hasNewsletter}
          />
        </section>

        <section>
          <ImpactMatrix opportunities={aiReport.opportunities} />
        </section>

        <PriorityMatrix opportunities={aiReport.opportunities} />
        {/* ================= Strength ================= */}

        <section className="grid lg:grid-cols-2 gap-6">
          <StrengthCard strengths={aiReport.strengths || []} />

          <WeaknessCard weaknesses={aiReport.weaknesses || []} />
        </section>

        {/* ================= Quick Stats ================= */}

        <section>
<SectionHeader
    title="Store Statistics"
    subtitle="Key metrics collected from the homepage"
/>
          <div className="grid md:grid-cols-4 gap-6">
            <StatsCard title="Images" value={evidence.homepage.imageCount} />

            <StatsCard title="Navigation" value={evidence.navigation.total} />

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

        <NavigationCard items={evidence.navigation.items} />

        {/* ================= Products ================= */}

        <section>
         <div className="flex justify-between items-center">

<SectionHeader
    title="Featured Products"
    subtitle="Products discovered during crawling"
/>

<span className="text-gray-500 font-medium">
    {evidence.products.totalProducts} Products
</span>

</div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {evidence.products.sampleProducts.map(
              (product: any, index: number) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard key={index} product={product} />
                </motion.div>
              ),
            )}
          </div>
        </section>

        {/* ================= Opportunities ================= */}

        <section>
        <SectionHeader
    title="Prioritized CRO Opportunities"
    subtitle="High-impact improvements ranked by confidence"
/>

          <div className="space-y-6">
            {aiReport.opportunities?.map((opportunity: any, index: number) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <OpportunityCard key={index} opportunity={opportunity} />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
