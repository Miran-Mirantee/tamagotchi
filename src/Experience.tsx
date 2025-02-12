import { CameraControls, Environment } from "@react-three/drei";
import Frame from "./components/Frame";
import PetInteractions from "./components/PetInteractions";
import Room from "./components/Room";

export default function Experience() {
  return (
    <>
      <Environment preset="apartment" background />
      <mesh position={[0, 1, 0.74]}>
        <boxGeometry args={[2.5, 2.5, 0.5]} />
        <meshStandardMaterial />
      </mesh>
      <Frame position={[0, 1, 1]}>
        <ambientLight />
        <directionalLight intensity={2.5} position={[3, 6, 3]} castShadow />
        <directionalLight intensity={1} position={[-3, 2, -6]} castShadow />
        <color args={["rgba(71,86,59,1)"]} attach={"background"} />
        <PetInteractions />
        <Room />
      </Frame>

      <CameraControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}
