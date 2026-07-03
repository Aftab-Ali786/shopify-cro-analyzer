interface Props{

store:any;

}

export default function StoreCard({

store

}:Props){

return(

<div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-100">

<h2 className="text-2xl font-bold mb-4">

Store Information

</h2>

<div className="space-y-3">

<p>

<b>Title</b>

<br/>

{store.title}

</p>

<p>

<b>Description</b>

<br/>

{store.description}

</p>

<p>

<b>Hero Heading</b>

<br/>

{store.heroHeading}

</p>

</div>

</div>

);

}