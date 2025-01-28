import { OrbitControls, Backdrop } from "@react-three/drei";
import { Cat } from "./components/Cat";

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <Cat scale={0.5} />
      <ambientLight />
      <directionalLight intensity={2.5} position={[3, 6, 3]} castShadow />
      <directionalLight intensity={1} position={[-3, 2, -6]} castShadow />
      <Backdrop
        receiveShadow
        position={[0, 0, -1]}
        scale={[10, 3, 2]}
        floor={2} // Stretches the floor segment, 0.25 by default
        segments={20} // Mesh-resolution, 20 by default
      >
        <meshStandardMaterial color="#353540" />
      </Backdrop>
    </>
  );
}
