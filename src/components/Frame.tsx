import * as THREE from "three";
import React, { forwardRef, useRef, useState, useEffect } from "react";
import {
  MeshPortalMaterial,
  PortalMaterialType,
  useCursor,
} from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import gsap from "gsap";

// Add your custom prop types for the component
type FrameProps = {
  width?: number;
  height?: number;
  children: React.ReactNode;
  doubleClickFunc?: () => void;
} & ThreeElements["group"];

const Frame = forwardRef<THREE.Group, FrameProps>(
  ({ width = 2, height = 2, children, doubleClickFunc, ...props }, ref) => {
    const portal = useRef<PortalMaterialType | null>(null);
    const [hovered, hover] = useState(false);

    useCursor(hovered);

    useEffect(() => {
      if (portal.current) {
        console.log("Portal material is ready", portal.current);
      }
    }, []);

    return (
      <group
        {...props}
        ref={ref}
        onDoubleClick={() => {
          console.log("TEST");
        }}
      >
        <mesh
          onDoubleClick={(e) => {
            e.stopPropagation();
            gsap.to(portal.current, {
              blend: 1,
              duration: 0.2,
            });
            if (doubleClickFunc) doubleClickFunc();
          }}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
        >
          <planeGeometry args={[width, height]} />
          <MeshPortalMaterial ref={portal} worldUnits>
            {children}
          </MeshPortalMaterial>
        </mesh>
      </group>
    );
  }
);

export default Frame;
