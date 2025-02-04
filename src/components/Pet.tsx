import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";

export type ActionName =
  | "CharacterArmature|Bite_Front"
  | "CharacterArmature|Dance"
  | "CharacterArmature|Death"
  | "CharacterArmature|HitRecieve"
  | "CharacterArmature|Idle"
  | "CharacterArmature|Jump"
  | "CharacterArmature|No"
  | "CharacterArmature|Walk"
  | "CharacterArmature|Yes";

export default function Pet({
  url,
  animation,
  ...props
}: { url: string; animation: ActionName } & JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { scene, nodes, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // actions[currentAnimation]!.clampWhenFinished = true;
    actions[animation]?.reset().fadeIn(0.5).play();
    // .setLoop(THREE.LoopOnce, 1);

    return () => {
      actions[animation]?.fadeOut(0.5);
    };
  }, [animation]);

  //   useEffect(() => {
  //     scene.traverse((child: any) => {
  //       if (child.isMesh) {
  //         if (child.material?.name.includes("Color_")) {
  //           child.material.color.set(assetColor);
  //         }
  //       }
  //     });
  //   }, [assetColor, scene]);

  const skinnedMeshes = useMemo(() => {
    const items: any[] = [];
    scene.traverse((child: any) => {
      if (child.isMesh) {
        items.push({
          geometry: child.geometry,
          material: child.material,
          skeleton: child.skeleton,
        });
      }
    });
    return items;
  }, [scene]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group
            name="CharacterArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.Body} />
            <primitive object={nodes.Head} />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            {skinnedMeshes.map((item, index) => {
              return (
                <skinnedMesh
                  key={index}
                  geometry={item.geometry}
                  material={item.material}
                  skeleton={item.skeleton}
                  castShadow
                  receiveShadow
                />
              );
            })}
          </group>
        </group>
      </group>
    </group>
  );
}
