interface Props{

items:string[];

}

export default function NavigationCard({

items

}:Props){

return(

<div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-100">

<h2 className="text-2xl font-bold">

Navigation

</h2>

<div className="flex flex-wrap gap-2 mt-5">

{

items.map(item=>(

<span

key={item}

className="bg-blue-100 px-3 py-1 rounded-full"

>

{item}

</span>

))

}

</div>

</div>

);

}