import { motion } from "framer-motion";

const skills=[
{skill:"React",level:95},
{skill:"JavaScript",level:92},
{skill:"MongoDB",level:88}
];

export default function SkillBars(){

 return(

 <div className="space-y-4">

 {skills.map((s,i)=>(

 <div key={i}>

 <p className="mb-1">{s.skill}</p>

 <div className="w-full bg-slate-700 h-2 rounded">

 <motion.div
 initial={{width:0}}
 whileInView={{width:`${s.level}%`}}
 transition={{duration:1}}
 className="bg-cyan-400 h-2 rounded"
 />

 </div>

 </div>

 ))}

 </div>

 );

}