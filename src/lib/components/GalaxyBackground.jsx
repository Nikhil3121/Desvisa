import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function GalaxyBackground() {

 const particlesInit = async (main) => {
   await loadFull(main);
 };

 return (
   <Particles
     id="tsparticles"
     init={particlesInit}
     options={{
       background: { color: "transparent" },
       particles: {
         number: { value: 120 },
         color: { value: "#00ffff" },
         size: { value: 2 },
         links: {
           enable: true,
           color: "#00ffff",
           distance: 150,
           opacity: 0.3
         },
         move: { enable: true, speed: 1 }
       }
     }}
   />
 );
}