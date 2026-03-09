import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";

export default function DevAvatar3D(){

 return(

 <div className="h-96">

 <Canvas>

 <ambientLight intensity={1} />

 <Float>

 <mesh>
   <boxGeometry args={[2,2,2]}/>
   <meshStandardMaterial color="#00ffff"/>
 </mesh>

 </Float>

 <OrbitControls enableZoom={false}/>

 </Canvas>

 </div>

 );

}