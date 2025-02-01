import { OrbitControls, Backdrop, MeshPortalMaterial } from "@react-three/drei";
import { Cat } from "./components/Cat";
import Rig from "./components/Rig";
import Frame from "./components/Frame";
import * as THREE from "three";

export default function Experience() {
  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <Rig />
      {/* <Cat scale={0.5} /> */}
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
      <Frame position={[0, 1, 1]}>
        <ambientLight />
        <directionalLight intensity={2.5} position={[3, 6, 3]} castShadow />
        <directionalLight intensity={1} position={[-3, 2, -6]} castShadow />
        <color args={["black"]} attach={"background"} />
        <Cat scale={0.5} />
        <Backdrop
          receiveShadow
          position={[0, 0, -1]}
          scale={[10, 3, 2]}
          floor={2} // Stretches the floor segment, 0.25 by default
          segments={20} // Mesh-resolution, 20 by default
        >
          <meshStandardMaterial color="rgba(44,37,67,1)" />
        </Backdrop>
      </Frame>

      {/* <mesh position={[0, 1, 1]}>
        <planeGeometry args={[2, 2]} />
        <MeshPortalMaterial side={THREE.DoubleSide} blend={0} worldUnits>
          <ambientLight />
          <directionalLight intensity={2.5} position={[3, 6, 3]} castShadow />
          <directionalLight intensity={1} position={[-3, 2, -6]} castShadow />
          <color args={["black"]} attach={"background"} />
          <Cat scale={0.5} />
          <Backdrop
            receiveShadow
            position={[0, 0, -1]}
            scale={[10, 3, 2]}
            floor={2} // Stretches the floor segment, 0.25 by default
            segments={20} // Mesh-resolution, 20 by default
          >
            <meshStandardMaterial color="rgba(44,37,67,1)" />
          </Backdrop>
        </MeshPortalMaterial>
      </mesh> */}
    </>
  );
}
