interface Props{

strengths:string[];

}

export default function StrengthCard({

strengths

}:Props){

return(

<div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-100">

<h2 className="text-2xl font-bold text-green-700">

Strengths

</h2>

<ul className="mt-4 list-disc ml-5">

{

strengths.map(s=>(

<li key={s}>

{s}

</li>

))

}

</ul>

</div>

);

}