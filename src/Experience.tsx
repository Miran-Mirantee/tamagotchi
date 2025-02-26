import * as THREE from "three";
import { useRef, useEffect } from "react";
import { CameraControls, Environment } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import PetInteractions from "./components/PetInteractions";
import Room from "./components/Room";
import Tamagotchi from "./components/Tamagotchi";
import { useControls } from "leva";
import useCameraStore from "./stores/useCameraStore";
import useUIStore from "./stores/useUIStore";

export default function Experience() {
  const petRef = useRef<THREE.Group | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const { controls, scene }: { controls: CameraControls; scene: THREE.Scene } =
    useThree();
  const positionOffset = useCameraStore((state) => state.positionOffset);
  const isInside = useUIStore((state) => state.isInside);

  useFrame(() => {
    if (petRef.current) {
      // controls.setTarget(...petRef.current.position.toArray());
      // controls.setLookAt(0, 0, 0, ...petRef.current.position.toArray(), true);
    }
  });

  useEffect(() => {
    if (dirLightRef.current) {
      const target = new THREE.Object3D();
      target.position.set(positionOffset.x, positionOffset.y, positionOffset.z);
      scene.add(target);
      dirLightRef.current.target = target;
    }
  }, [dirLightRef.current]);

  const c = useControls({
    coord: { value: { x: 0, y: -2, z: -15 }, min: -30, max: 30 },
  });

  return (
    <>
      <Environment preset="apartment" />
      <color args={["rgba(255,247,176,1)"]} attach={"background"} />
      {/* <mesh position={[0, 1, 0.74]}>
        <boxGeometry args={[2.5, 2.5, 0.5]} />
        <meshStandardMaterial />
      </mesh> */}
      <Tamagotchi>
        <color args={["rgba(71,86,59,1)"]} attach={"background"} />
        <ambientLight />
        <group position={[c.coord.x, c.coord.y, c.coord.z]}>
          <directionalLight
            ref={dirLightRef}
            intensity={2.5}
            position={[0, 4, 2]}
            castShadow
          />
          <PetInteractions petRefToParent={petRef} />
          <Room />
        </group>
      </Tamagotchi>
      {/* <Frame position={[0, 1, 1]}>
      </Frame> */}

      <CameraControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}
