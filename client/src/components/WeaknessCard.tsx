interface Props{

weaknesses:string[];

}

export default function WeaknessCard({

weaknesses

}:Props){

return(

<div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-100">

<h2 className="text-2xl font-bold text-red-700">

Weaknesses

</h2>

<ul className="mt-4 list-disc ml-5">

{

weaknesses.map(w=>(

<li key={w}>

{w}

</li>

))

}

</ul>

</div>

);

}