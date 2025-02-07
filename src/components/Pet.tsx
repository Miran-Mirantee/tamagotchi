import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useMemo, useRef, forwardRef } from "react";
import useTamagotchiStore from "../stores/useTamagotchiStore";

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

const Pet = forwardRef<
  THREE.Group,
  { url: string; animation: ActionName } & JSX.IntrinsicElements["group"]
>(({ url, animation, ...props }, ref) => {
  const group = useRef<THREE.Group>(null);
  const { scene, nodes, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);
  const setAnimationActions = useTamagotchiStore(
    (state) => state.setAnimationActions
  );

  useEffect(() => {
    if (actions) setAnimationActions(actions);
  }, [actions]);

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.5).play();
    return () => {
      actions[animation]?.fadeOut(0.5);
    };
  }, [animation]);

  // Assign the forwarded ref to the internal ref
  useEffect(() => {
    if (typeof ref === "function") {
      ref(group.current);
    } else if (ref) {
      (ref as React.MutableRefObject<THREE.Group | null>).current =
        group.current;
    }
  }, [ref]);

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
            {skinnedMeshes.map((item, index) => (
              <skinnedMesh
                key={index}
                geometry={item.geometry}
                material={item.material}
                skeleton={item.skeleton}
                castShadow
                receiveShadow
              />
            ))}
          </group>
        </group>
      </group>
    </group>
  );
});

export default Pet;
