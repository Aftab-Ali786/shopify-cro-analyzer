interface Props{
title:string;
value:any;
}

export default function StatsCard({
title,
value
}:Props){

return(

<div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-100">

<h2 className="text-lg text-gray-500">

{title}

</h2>

<p className="text-4xl font-bold mt-3">

{value}

</p>

</div>

);

}