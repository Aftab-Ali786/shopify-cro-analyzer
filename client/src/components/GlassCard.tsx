import { type ReactNode } from "react";

interface Props{
    children:ReactNode;
    className?:string;
}

export default function GlassCard({
    children,
    className=""
}:Props){

return(

<div
className={`

rounded-3xl
bg-white
shadow-lg
border
border-slate-200
backdrop-blur-lg
transition-all
duration-300
hover:shadow-2xl
hover:-translate-y-1
${className}

`}
>

{children}

</div>

);

}