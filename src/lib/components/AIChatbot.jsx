import { useState } from "react";
import { MessageCircle } from "lucide-react";

export default function AIChatbot() {

 const [messages, setMessages] = useState([
   { role: "bot", text: "Hello! I'm the AI assistant of this portfolio. Ask anything." }
 ]);

 const [input, setInput] = useState("");

 const sendMessage = () => {

   if(!input) return;

   const userMsg = { role: "user", text: input };

   const botMsg = {
     role: "bot",
     text: "Thanks for your message! This portfolio is built with React + Tailwind."
   };

   setMessages([...messages, userMsg, botMsg]);
   setInput("");
 };

 return (
 <div className="fixed bottom-8 right-8 w-80 bg-slate-900 border border-cyan-500 rounded-xl shadow-xl z-50">

  <div className="p-3 border-b border-slate-700 flex items-center gap-2">
   <MessageCircle size={18}/>
   AI Assistant
  </div>

  <div className="h-64 overflow-y-auto p-3 space-y-2">
  {messages.map((m,i)=>(
   <div key={i} className={m.role==="user"?"text-right":""}>
    <span className="text-sm">{m.text}</span>
   </div>
  ))}
  </div>

  <div className="flex">
   <input
    value={input}
    onChange={(e)=>setInput(e.target.value)}
    className="flex-1 p-2 bg-slate-800 outline-none text-sm"
   />
   <button onClick={sendMessage} className="px-4 bg-cyan-500">
    Send
   </button>
  </div>

 </div>
 );
}