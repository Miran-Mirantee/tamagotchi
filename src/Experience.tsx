import * as THREE from "three";
import { useRef, useEffect } from "react";
import { CameraControls, Environment } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import Frame from "./components/Frame";
import PetInteractions from "./components/PetInteractions";
import Room from "./components/Room";

export default function Experience() {
  const petRef = useRef<THREE.Group | null>(null);
  const { controls }: { controls: CameraControls } = useThree();

  useFrame(() => {
    if (petRef.current) {
      // controls.setTarget(...petRef.current.position.toArray());
      // controls.setLookAt(0, 0, 0, ...petRef.current.position.toArray(), true);
    }
  });

  return (
    <>
      <Environment preset="apartment" />
      <color args={["rgba(162,143,79,1)"]} attach={"background"} />
      <mesh position={[0, 1, 0.74]}>
        <boxGeometry args={[2.5, 2.5, 0.5]} />
        <meshStandardMaterial />
      </mesh>
      <Frame position={[0, 1, 1]}>
        <ambientLight />
        <directionalLight intensity={2.5} position={[0, 4, 2]} castShadow />
        <color args={["rgba(71,86,59,1)"]} attach={"background"} />
        <PetInteractions petRefToParent={petRef} />
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
