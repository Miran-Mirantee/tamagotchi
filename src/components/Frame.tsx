import { useState, useRef } from "react";
import { MeshPortalMaterial, useCursor } from "@react-three/drei";
import { ThreeElements, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Frame({
  width = 2,
  height = 2,
  children,
  ...props
}: {
  width?: number;
  height?: number;
  children: React.ReactNode;
} & ThreeElements["group"]) {
  const portal = useRef(null);
  const [hovered, hover] = useState(false);
  useCursor(hovered);
  useFrame(
    (state, dt) => {}
    // easing.damp(portal.current, "blend", params?.id === id ? 1 : 0, 0.2, dt)
  );
  return (
    <group {...props}>
      <mesh
        // name={id}
        onDoubleClick={(e) => {}}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <planeGeometry args={[width, height]} />
        <MeshPortalMaterial
          ref={portal}
          //   events={params?.id === id}
          worldUnits
          side={THREE.DoubleSide}
        >
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
}
