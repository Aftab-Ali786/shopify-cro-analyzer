import { useState } from "react";

interface Props {

    issues:any[];

}

export default function IssueSidebar({

issues

}:Props){

const[selected,setSelected]=useState<any>(null);

return(

<div className="bg-white rounded-2xl shadow-lg p-6">

<h2 className="text-2xl font-bold mb-6">

Detected Issues

</h2>

<div className="space-y-4">

{

issues.map((issue)=>(

<div

key={issue.id}

onClick={()=>setSelected(issue)}

className="cursor-pointer rounded-xl border p-4 hover:bg-slate-50"

>

<h3 className="font-bold">

{issue.title}

</h3>

<p className="text-gray-500 text-sm">

{issue.severity} Priority

</p>

</div>

))

}

</div>

{

selected&&(

<div className="mt-8 border-t pt-6">

<h3 className="text-xl font-bold">

{selected.title}

</h3>

<p className="mt-4">

{selected.description}

</p>

<div className="mt-6">

<b>Recommendation</b>

<p className="mt-2">

Improve this area to increase user engagement and conversions.

</p>

</div>

</div>

)

}

</div>

);

}