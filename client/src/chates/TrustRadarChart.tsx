import{

RadarChart,

Radar,

PolarGrid,

PolarAngleAxis,

PolarRadiusAxis,

ResponsiveContainer

}from"recharts";

interface Props{

trust:any;

}

export default function TrustRadarChart({

trust

}:Props){

const data=[

{name:"Reviews",value:trust.reviews?100:0},

{name:"Shipping",value:trust.shipping?100:0},

{name:"Returns",value:trust.returns?100:0},

{name:"FAQ",value:trust.faq?100:0},

{name:"Payments",value:trust.paymentIcons?100:0},

];

return(

<div className="bg-white rounded-2xl shadow-lg p-6">

<h2 className="text-xl font-bold mb-5">

Trust Signals

</h2>

<div className="h-80">

<ResponsiveContainer>

<RadarChart data={data}>

<PolarGrid/>

<PolarAngleAxis dataKey="name"/>

<PolarRadiusAxis domain={[0,100]}/>

<Radar

dataKey="value"

stroke="#4F46E5"

fill="#4F46E5"

fillOpacity={0.5}

/>

</RadarChart>

</ResponsiveContainer>

</div>

</div>

);

}