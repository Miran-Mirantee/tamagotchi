import { OrbitControls } from "@react-three/drei";
import { Cat } from "./components/Cat";

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <Cat scale={0.5} />
      <ambientLight />
      <directionalLight intensity={2.5} position={[3, 6, 3]} />
      <directionalLight intensity={1} position={[-3, 2, -6]} />
    </>
  );
}
