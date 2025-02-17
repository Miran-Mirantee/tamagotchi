import * as THREE from "three";
import React, { useRef, forwardRef } from "react";
import { useGLTF, Outlines } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import useObjectStore from "../../stores/useObjectStore";

type GLTFResult = GLTF & {
  nodes: {
    Bed_Single_1: THREE.Mesh;
    Bed_Single_2: THREE.Mesh;
    Bed_Single_3: THREE.Mesh;
    Bed_Single_4: THREE.Mesh;
    Bed_Single_5: THREE.Mesh;
  };
  materials: {
    White: THREE.MeshStandardMaterial;
    Wood: THREE.MeshStandardMaterial;
    Grey: THREE.MeshStandardMaterial;
    Red: THREE.MeshStandardMaterial;
    DarkRed: THREE.MeshStandardMaterial;
  };
};

const Bed = forwardRef<THREE.Group, JSX.IntrinsicElements["group"]>(
  (props, ref) => {
    const { nodes, materials } = useGLTF(
      "/models/furniture/Bed.glb"
    ) as GLTFResult;
    const currentObject = useObjectStore((state) => state.currentObject);
    const outlineColor = useObjectStore((state) => state.outlineColor);

    const PresetOutlines = () => {
      return (
        <Outlines angle={0} color={outlineColor} scale={1} thickness={5} />
      );
    };

    return (
      <group ref={ref} {...props} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={100} name="Bed">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Bed_Single_1.geometry}
            material={materials.White}
          >
            {currentObject?.name == "Bed" && <PresetOutlines />}
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Bed_Single_2.geometry}
            material={materials.Wood}
          >
            {currentObject?.name == "Bed" && <PresetOutlines />}
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Bed_Single_3.geometry}
            material={materials.Grey}
          >
            {currentObject?.name == "Bed" && <PresetOutlines />}
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Bed_Single_4.geometry}
            material={materials.Red}
          >
            {currentObject?.name == "Bed" && <PresetOutlines />}
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Bed_Single_5.geometry}
            material={materials.DarkRed}
          >
            {currentObject?.name == "Bed" && <PresetOutlines />}
          </mesh>
        </group>
      </group>
    );
  }
);

export default Bed;

useGLTF.preload("/models/furniture/Bed.glb");
