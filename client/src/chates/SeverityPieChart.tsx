import{
PieChart,
Pie,
Cell,
Tooltip,
ResponsiveContainer
}from"recharts";

interface Issue {
  severity: 'High' | 'Medium' | 'Low';
}

interface Props {
  issues: Issue[];
}

export default function SeverityPieChart({
  issues
}: Props) {
  const counts: Record<Issue['severity'], number> = {
    High: 0,
    Medium: 0,
    Low: 0
  };

issues.forEach(i=>{

counts[i.severity]++;

});

const data=[

{name:"High",value:counts.High},

{name:"Medium",value:counts.Medium},

{name:"Low",value:counts.Low}

];

const colors=[

"#DC2626",

"#F59E0B",

"#3B82F6"

];

return(

<div className="bg-white rounded-2xl shadow-lg p-6">

<h2 className="text-xl font-bold mb-5">

Issue Severity

</h2>

<div className="h-72">

<ResponsiveContainer>

<PieChart>

<Pie

data={data}

dataKey="value"

outerRadius={90}

label

>

{

data.map((_,i)=>

<Cell key={i} fill={colors[i]}/>

)

}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

</div>

);

}