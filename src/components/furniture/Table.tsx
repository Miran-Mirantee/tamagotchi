import * as THREE from "three";
import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Table_RoundSmall: THREE.Mesh;
  };
  materials: {
    Wood: THREE.MeshStandardMaterial;
  };
};

const Table = forwardRef<THREE.Group, JSX.IntrinsicElements["group"]>(
  (props, ref) => {
    const { nodes, materials } = useGLTF(
      "/models/furniture/Table.glb"
    ) as GLTFResult;

    return (
      <group ref={ref} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Table_RoundSmall.geometry}
          material={materials.Wood}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
      </group>
    );
  }
);

export default Table;

useGLTF.preload("/models/furniture/Table.glb");
