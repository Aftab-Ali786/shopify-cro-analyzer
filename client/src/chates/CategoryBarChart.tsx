import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts";

interface Props{

scores:any;

}

export default function CategoryBarChart({scores}:Props){

const data=[

{name:"UX",score:scores.ux},

{name:"Trust",score:scores.trust},

{name:"SEO",score:scores.seo},

{name:"Content",score:scores.content},

{name:"Performance",score:scores.performance},

];

return(

<div className="bg-white rounded-2xl shadow-lg p-6">

<h2 className="text-xl font-bold mb-5">

Category Scores

</h2>

<div className="h-72">

<ResponsiveContainer>

<BarChart data={data}>

<XAxis dataKey="name"/>

<YAxis domain={[0,100]}/>

<Tooltip/>

<Bar dataKey="score"/>

</BarChart>

</ResponsiveContainer>

</div>

</div>

);

}