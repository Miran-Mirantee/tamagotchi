import * as THREE from "three";
import { CameraControls } from "@react-three/drei";

export const zoomTransition = (
  frame: THREE.Group,
  controls: CameraControls,
  position: { x: number; y: number; z: number },
  focus: { x: number; y: number; z: number }
) => {
  const camera = {
    cameraPos: new THREE.Vector3(0, 0, 0),
    cameraFocus: new THREE.Vector3(0, 0, 0),
  };
  frame.localToWorld(camera.cameraPos.set(position.x, position.y, position.z));
  frame.localToWorld(camera.cameraFocus.set(focus.x, focus.y, focus.z));

  controls.setLookAt(
    ...camera.cameraPos.toArray(),
    ...camera.cameraFocus.toArray(),
    true
  );
};

export const enterFocusMode = (
  controls: CameraControls,
  position: THREE.Vector3,
  focus: THREE.Vector3
) => {
  controls.setLookAt(...position.toArray(), ...focus.toArray(), true);
  controls.dollySpeed = 0;
  controls.truckSpeed = 0;
};

export const exitFocusMode = (controls: CameraControls) => {
  controls.setLookAt(0, 5, 10, 0, 0, 0, true);
  controls.dollySpeed = 1;
  controls.truckSpeed = 2;
};
