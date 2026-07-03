import type { ReactNode } from "react";

interface Props{

title:string;

subtitle?:string;

icon?:ReactNode;

}

export default function SectionHeader({

title,

subtitle,

icon

}:Props){

return(

<div className="flex items-center justify-between mb-6">

<div>

<div className="flex items-center gap-3">

{icon}

<h2 className="text-3xl font-bold">

{title}

</h2>

</div>

{subtitle&&(

<p className="text-gray-500 mt-1">

{subtitle}

</p>

)}

</div>

</div>

);

}