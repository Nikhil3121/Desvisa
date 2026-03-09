import Typewriter from "typewriter-effect";

export default function TerminalIntro(){

 return(

 <div className="bg-black text-green-400 font-mono p-6 rounded-lg">

 <Typewriter
 options={{
 autoStart:true,
 loop:true,
 delay:40,
 strings:[
 "Hello World",
 "Initializing Developer Portfolio...",
 "Loading Projects...",
 "System Ready 🚀"
 ]
 }}
 />

 </div>

 );

}