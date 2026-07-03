import { HiSparkles } from "react-icons/hi2";

export default function Header(){

return(

<header className="sticky top-0 z-50 bg-white border-b shadow-sm">

<div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">

<div className="flex items-center gap-3">

<div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center">

<HiSparkles size={24}/>

</div>

<div>

<h1 className="font-bold text-2xl">

Shopify CRO Analyzer

</h1>

<p className="text-gray-500">

AI Powered Conversion Optimization

</p>

</div>

</div>

</div>

</header>

);

}