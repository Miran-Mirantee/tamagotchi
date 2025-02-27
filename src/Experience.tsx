import * as THREE from "three";
import { useRef, useEffect } from "react";
import { CameraControls, Environment, useHelper } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import PetInteractions from "./components/PetInteractions";
import Room from "./components/Room";
import Tamagotchi from "./components/Tamagotchi";
import { useControls } from "leva";
import useCameraStore from "./stores/useCameraStore";
import useShadowHelper from "./Utils/UseShadowHelper";

export default function Experience() {
  const petRef = useRef<THREE.Group | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const dirLight2Ref = useRef<THREE.DirectionalLight | null>(null);
  const pointLightRef = useRef<THREE.PointLight | null>(null);
  const { controls, scene }: { controls: CameraControls; scene: THREE.Scene } =
    useThree();
  const positionOffset = useCameraStore((state) => state.positionOffset);

  useEffect(() => {
    const target = new THREE.Object3D();
    target.position.set(positionOffset.x, positionOffset.y, positionOffset.z);
    scene.add(target);
    if (dirLightRef.current) {
      dirLightRef.current.target = target;
    }
    if (dirLight2Ref.current) {
      dirLight2Ref.current.target = target;
    }
  }, [dirLightRef, dirLight2Ref]);

  const c = useControls({
    coord: { value: { x: 0, y: 0, z: 0 }, min: -10, max: 10 },
    ambientColor: { value: "#d58b8b" },
    ambientIntensity: { value: 3.75, min: 0, max: 30, step: 0.25 },
    dirColor: { value: "#fcffba" },
    dirIntensity: { value: 3.75, min: 0, max: 30, step: 0.25 },
    dir2Color: { value: "#c2ffe8" },
    dir2Intensity: { value: 1.75, min: 0, max: 30, step: 0.25 },
    pointColor: { value: "#fce47b" },
    pointIntensity: { value: 30.0, min: 0, max: 30, step: 0.25 },
    bgColor: { value: "#d58b8b" },
  });

  // useShadowHelper(dirLightRef);
  // useShadowHelper(dirLight2Ref);
  // useHelper(pointLightRef, THREE.PointLightHelper, 1, c.pointColor);
  // useHelper(dirLightRef, THREE.DirectionalLightHelper, 1, c.dirColor);
  // useHelper(dirLight2Ref, THREE.DirectionalLightHelper, 1, c.dir2Color);

  return (
    <>
      <Environment preset="apartment" />
      <color args={["rgba(255,247,176,1)"]} attach={"background"} />

      <Tamagotchi>
        <color args={[c.bgColor]} attach={"background"} />
        <ambientLight intensity={c.ambientIntensity} color={c.ambientColor} />
        <group
          position={[positionOffset.x, positionOffset.y, positionOffset.z]}
        >
          <pointLight
            ref={pointLightRef}
            intensity={c.pointIntensity}
            color={c.pointColor}
            position={[-2.5, 5, -2.5]}
            castShadow
          />
          <directionalLight
            ref={dirLightRef}
            intensity={c.dirIntensity}
            color={c.dirColor}
            position={[6.0, 7.4, 6.2]}
            castShadow
            shadow-camera-left={-8}
            shadow-camera-right={8}
            shadow-camera-top={10}
            shadow-camera-bottom={-6}
            shadow-camera-far={20}
            shadow-camera-height={1024}
            shadow-camera-width={1024}
          />
          <directionalLight
            ref={dirLight2Ref}
            intensity={c.dir2Intensity}
            color={c.dir2Color}
            position={[10.0, 3.0, 0]}
            castShadow
            shadow-camera-left={-7}
            shadow-camera-right={7}
            shadow-camera-top={7}
            shadow-camera-bottom={-2}
            shadow-camera-near={4}
            shadow-camera-far={18}
            shadow-camera-height={1024}
            shadow-camera-width={1024}
          />
          <PetInteractions petRefToParent={petRef} />
          <Room />
        </group>
      </Tamagotchi>

      <CameraControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}
