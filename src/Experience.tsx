import * as THREE from "three";
import { useRef, useEffect } from "react";
import { Backdrop, CameraControls, Environment } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import Frame from "./components/Frame";
import useCameraStore from "./stores/useCameraStore";
import PetInteractions from "./components/PetInteractions";
import useTamagotchiStore from "./stores/useTamagotchiStore";

import Room from "./components/Room";

export default function Experience() {
  const { controls, scene }: { controls: CameraControls; scene: THREE.Scene } =
    useThree();
  const setZoomInTransition = useCameraStore(
    (state) => state.setZoomInTransition
  );
  const setZoomOutTransition = useCameraStore(
    (state) => state.setZoomOutTransition
  );

  useFrame((state) => {
    // console.log(state.camera.rotation);
  });

  useEffect(() => {
    const config = {
      cameraPos: new THREE.Vector3(0, 0, 0),
      cameraFocus: new THREE.Vector3(0, 0, 0),
    };

    const zoomInTransition = (frame: THREE.Group) => {
      frame.localToWorld(config.cameraPos.set(0, 0.45, 2.735));
      frame.localToWorld(config.cameraFocus.set(0, -0.5, 0));

      controls.setLookAt(
        ...config.cameraPos.toArray(),
        ...config.cameraFocus.toArray(),
        true
      );
    };

    const zoomOutTransition = (frame: THREE.Group) => {
      frame.localToWorld(config.cameraPos.set(0, 2, 3));
      frame.localToWorld(config.cameraFocus.set(0, 0, 0));

      controls.setLookAt(
        ...config.cameraPos.toArray(),
        ...config.cameraFocus.toArray(),
        true
      );
    };
    setZoomInTransition(zoomInTransition);
    setZoomOutTransition(zoomOutTransition);
  }, [setZoomInTransition, setZoomOutTransition, controls]);

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
        <color args={["black"]} attach={"background"} />
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
