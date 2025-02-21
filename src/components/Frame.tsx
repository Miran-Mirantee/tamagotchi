import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import {
  CameraControls,
  MeshPortalMaterial,
  PortalMaterialType,
  useCursor,
} from "@react-three/drei";
import { ThreeElements, useThree } from "@react-three/fiber";
import gsap from "gsap";
import useUIStore from "../stores/useUIStore";
import useCameraStore from "../stores/useCameraStore";
import { zoomTransition } from "../Utils/cameraController";

// Add your custom prop types for the component
type FrameProps = {
  width?: number;
  height?: number;
  children: React.ReactNode;
} & ThreeElements["group"];

const Frame = ({ width = 2, height = 2, children, ...props }: FrameProps) => {
  const portal = useRef<PortalMaterialType | null>(null);
  const frame = useRef<THREE.Group | null>(null);
  const [hovered, hover] = useState(false);
  const setBackFunction = useUIStore((state) => state.setBackFunction);
  const setIsInside = useUIStore((state) => state.setIsInside);
  const isInside = useUIStore((state) => state.isInside);
  const isBrowsingFood = useUIStore((state) => state.isBrowsingFood);
  const enterFocusMode = useCameraStore((state) => state.enterFocusMode);
  const { controls }: { controls: CameraControls } = useThree();

  useCursor(hovered);

  useEffect(() => {
    setBackFunction(back);
  }, [setBackFunction, controls]);

  useEffect(() => {
    if (isBrowsingFood) {
      // have to call this outside of the portal for correctly camera transition
      enterFocusMode();
    }
  }, [isBrowsingFood]);

  const back = () => {
    gsap.to(portal.current, {
      blend: 0,
      duration: 0.5,
    });
    zoomTransition(
      frame.current!,
      controls,
      { x: 0, y: 0, z: 5 },
      { x: 0, y: 0, z: 0 }
    );
    setIsInside(false);
  };

  const enter = () => {
    gsap.to(portal.current, {
      blend: 1,
      duration: 0.5,
    });
    zoomTransition(
      frame.current!,
      controls,
      { x: 0, y: 6, z: 10 },
      { x: 0, y: -0.5, z: 0 }
    );
    setIsInside(true);
    hover(false);
  };

  return (
    <group {...props} ref={frame}>
      <mesh
        onDoubleClick={(e) => {
          if (!isInside) {
            enter();
            e.stopPropagation();
          }
        }}
        onPointerOver={() => {
          if (!isInside) hover(true);
        }}
        onPointerOut={() => {
          if (!isInside) hover(false);
        }}
      >
        <planeGeometry args={[width, height]} />
        <MeshPortalMaterial ref={portal} worldUnits>
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
};

export default Frame;
