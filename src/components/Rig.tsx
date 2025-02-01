import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { CameraControls } from "@react-three/drei";

export default function Rig({
  position = new THREE.Vector3(0, 1.5, 5),
  focus = new THREE.Vector3(0, 0, 0),
}) {
  const { controls, scene }: { controls: CameraControls; scene: THREE.Scene } =
    useThree();
  // const cameraControls = controls as CameraControls;
  useEffect(() => {
    //   const active = scene.getObjectByName(params?.id)
    //   console.log(active)
    //   if (active) {
    //     active.parent.localToWorld(position.set(0, 0.5, 0.25))
    //     active.parent.localToWorld(focus.set(0, 0, -2))
    //   }

    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
  });
  // return <OrbitControls />
  return (
    <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
  );
}
