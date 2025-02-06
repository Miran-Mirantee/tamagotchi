import * as THREE from "three";
import { useControls } from "leva";
import Table from "./furniture/Table";
import Toilet from "./furniture/Toilet";
import Bathtub from "./furniture/Bathtub";
import Bed from "./furniture/Bed";
import Plate from "./furniture/Plate";

const Walls = () => {
  const c = useControls({
    r: { value: { x: 0, z: 0 }, min: -5, max: 5, step: 0.01 },
  });
  return (
    <>
      <mesh rotation={[Math.PI * -0.5, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="rgba(44,37,67,1)" />
      </mesh>
      <mesh position={[0, 2, -5]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial
          color="rgba(44,37,67,1)"
          //   side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[0, Math.PI * -0.5, 0]} position={[5, 2, 0]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial
          color="rgba(44,37,67,1)"
          //   side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[0, Math.PI * 0.5, 0]} position={[-5, 2, 0]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial
          color="rgba(44,37,67,1)"
          //   side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[0, Math.PI, 0]} position={[0, 2, 5]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial
          color="rgba(44,37,67,1)"
          // side={THREE.DoubleSide}
        />
      </mesh>
      {/* Bathroom */}
      <mesh rotation={[0, Math.PI * 0.5, 0]} position={[0.2, 2, -2.5]}>
        <boxGeometry args={[5, 4, 0.1]} />
        <meshStandardMaterial color="rgba(44,37,67,1)" />
      </mesh>
      <mesh rotation={[0, 0, 0]} position={[-3.5, 2, -0.05]}>
        <boxGeometry args={[3, 4, 0.1]} />
        <meshStandardMaterial color="rgba(44,37,67,1)" />
      </mesh>
    </>
  );
};

export default function Room() {
  const c = useControls({
    f: { value: { x: 0, z: 0 }, min: -5, max: 5, step: 0.01 },
  });
  return (
    <>
      {/* position={[c.f.x, 0, c.f.z]} */}
      <Walls />
      <Table position={[3.2, 0, 3.2]} scale={[1, 0.4, 1]} />
      <Plate position={[3.2, 0.46, 2.83]} />
      <Toilet position={[-1.15, 0, -4.09]} />
      <Bathtub position={[-3.85, 0, -2.86]} scale={[1.4, 1.2, 1]} />
      <Bed position={[3.9, 0, -3.0]} />
    </>
  );
}
