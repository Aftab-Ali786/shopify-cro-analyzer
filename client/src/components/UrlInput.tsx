import { useState } from "react";
import { api } from "../services/api";
import CRODashboard from "./CRODashboard";

export default function UrlInput() {
  const [url, setUrl] = useState("");
const [report, setReport] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!url) {
      alert("Please enter a Shopify store URL");
      return;
    }

    try {
      const response = await api.post("/analyze", {
        url,
      });

      const {
    evidence,
    ruleReport,
    aiReport
} = response.data;

console.log("Evidence");
console.log(evidence);
setReport(response.data);
console.log("Rule Report");
console.log(ruleReport);

console.log("AI Report");
console.log(aiReport);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-100">
      <label className="block mb-2 font-semibold">Shopify Store URL</label>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://store.myshopify.com"
        className="w-full border rounded-md p-3"
      />

      <button
        onClick={handleAnalyze}
        className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-md w-full"
      >
        Analyze Store
      </button>
      <CRODashboard data={report} />
    </div>
  );
}
