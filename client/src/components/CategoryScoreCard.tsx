interface Props{

scores:any;

}

export default function CategoryScoreCard({

scores

}:Props){

return(

<div className="bg-white rounded-2xl shadow-lg p-6">

<h2 className="text-2xl font-bold mb-6">

Category Scores

</h2>

<div className="space-y-5">

{

Object.entries(scores).map(([key,value]:any)=>(

<div key={key}>

<div className="flex justify-between mb-2">

<span className="font-semibold">

{key}

</span>

<span>

{value}%

</span>

</div>

<div className="w-full bg-gray-200 rounded-full h-4">

<div

className={`h-4 rounded-full transition-all duration-700

${
value>=85

?"bg-green-500"

:value>=70

?"bg-yellow-500"

:"bg-red-500"

}

`}

style={{

width:`${value}%`

}}

>

</div>

</div>

</div>

))

}

</div>

</div>

);

}