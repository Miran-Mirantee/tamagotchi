import { Stage, OrbitControls } from "@react-three/drei";

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <Stage>
        <mesh>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
      </Stage>
    </>
  );
}
