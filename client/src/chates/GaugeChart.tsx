import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis
} from "recharts";

interface Props{
    score:number;
}

export default function GaugeChart({score}:Props){

const data=[{name:"Score",value:score,fill:"#4F46E5"}];

return(

<div className="bg-white rounded-2xl shadow-lg p-6">

<h2 className="text-xl font-bold mb-4">
Overall CRO Score
</h2>

<RadialBarChart
width={280}
height={250}
cx="50%"
cy="90%"
innerRadius="70%"
outerRadius="100%"
barSize={20}
data={data}
startAngle={180}
endAngle={0}
>

<PolarAngleAxis
type="number"
domain={[0,100]}
tick={false}
/>

<RadialBar
background
dataKey="value"
/>

<text
x="50%"
y="75%"
textAnchor="middle"
fontSize="34"
fontWeight="bold"
>
{score}
</text>

</RadialBarChart>

</div>

);

}