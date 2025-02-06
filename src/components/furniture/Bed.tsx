import * as THREE from "three";
import React, { useRef, forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

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

    return (
      <group ref={ref} {...props} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Bed_Single_1.geometry}
            material={materials.White}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Bed_Single_2.geometry}
            material={materials.Wood}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Bed_Single_3.geometry}
            material={materials.Grey}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Bed_Single_4.geometry}
            material={materials.Red}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Bed_Single_5.geometry}
            material={materials.DarkRed}
          />
        </group>
      </group>
    );
  }
);

export default Bed;

useGLTF.preload("/models/furniture/Bed.glb");
