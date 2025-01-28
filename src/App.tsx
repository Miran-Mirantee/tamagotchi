import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

export default function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 0.1, 3], fov: 45, near: 0.1, far: 200 }}>
        <color args={["rgba(62,58,74,1)"]} attach={"background"} />
        <Experience />
      </Canvas>
    </>
  );
}
