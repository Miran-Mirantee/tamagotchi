import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import {
  MeshPortalMaterial,
  PortalMaterialType,
  useCursor,
} from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import gsap from "gsap";
import useUIStore from "../stores/useUIStore";
import useCameraStore from "../stores/useCameraStore";

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
  const [isInside, setIsInside] = useState(false);
  const setBackFunction = useUIStore((state) => state.setBackFunction);
  const zoomInTransition = useCameraStore((state) => state.zoomInTransition);
  const zoomOutTransition = useCameraStore((state) => state.zoomOutTransition);

  useCursor(hovered);

  // useEffect(() => {
  //   if (portal.current) {
  //     console.log("Portal material is ready", portal.current);
  //   }
  // }, []);
  useEffect(() => {
    setBackFunction(back);
  }, [setBackFunction, zoomOutTransition]);

  const back = () => {
    const backBtn = document.querySelector(".back-btn") as HTMLElement;
    backBtn.style.opacity = "0";
    backBtn.style.pointerEvents = "none";
    gsap.to(portal.current, {
      blend: 0,
      duration: 0.5,
    });
    zoomOutTransition(frame.current!);
    setIsInside(false);
  };

  const enter = () => {
    const backBtn = document.querySelector(".back-btn") as HTMLElement;
    backBtn.style.opacity = "1";
    backBtn.style.pointerEvents = "all";
    gsap.to(portal.current, {
      blend: 1,
      duration: 0.5,
    });
    zoomInTransition(frame.current!);
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
