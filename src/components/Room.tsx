/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import {
  CameraControls,
  Outlines,
  useCursor,
  useGLTF,
} from "@react-three/drei";
import { GLTF } from "three-stdlib";
import useUIStore from "../stores/useUIStore";
import useTamagotchiStore, { PetAction } from "../stores/useTamagotchiStore";
import useCameraStore from "../stores/useCameraStore";
import useObjectStore from "../stores/useObjectStore";
import { enterFocusMode, exitFocusMode } from "../Utils/cameraController";
import Food from "./Food";

type GLTFResult = GLTF & {
  nodes: {
    Plate: THREE.Mesh;
    Table_RoundSmall: THREE.Mesh;
    Bathroom_Bathtub: THREE.Mesh;
    Bathroom_Bathtub_1: THREE.Mesh;
    Bathroom_Bathtub_2: THREE.Mesh;
    Toilet: THREE.Mesh;
    Bed_Single: THREE.Mesh;
    Bed_Single_1: THREE.Mesh;
    Bed_Single_2: THREE.Mesh;
    Bed_Single_3: THREE.Mesh;
    Bed_Single_4: THREE.Mesh;
    Bathroom_Towel_1: THREE.Mesh;
    Bathroom_Towel_2: THREE.Mesh;
    Bathroom_Towel_3: THREE.Mesh;
    Carpet_1_1: THREE.Mesh;
    Carpet_1_2: THREE.Mesh;
    NightStand_2_1: THREE.Mesh;
    NightStand_2_2: THREE.Mesh;
    Light_Floor2_1: THREE.Mesh;
    Light_Floor2_2: THREE.Mesh;
    Drawer_5_1: THREE.Mesh;
    Drawer_5_2: THREE.Mesh;
    Drawer_5_3: THREE.Mesh;
    Houseplant_2001: THREE.Mesh;
    Houseplant_2001_1: THREE.Mesh;
    Houseplant_2001_2: THREE.Mesh;
    Houseplant_2001_3: THREE.Mesh;
    Houseplant_4_1: THREE.Mesh;
    Houseplant_4_2: THREE.Mesh;
    Houseplant_4_3: THREE.Mesh;
    Houseplant_7_1: THREE.Mesh;
    Houseplant_7_2: THREE.Mesh;
    Houseplant_7_3: THREE.Mesh;
    Carpet_Round_1: THREE.Mesh;
    Carpet_Round_2: THREE.Mesh;
    floor: THREE.Mesh;
    toilet_floor: THREE.Mesh;
    toilet_wall001: THREE.Mesh;
    Cube006: THREE.Mesh;
    Cube006_1: THREE.Mesh;
    fishingRod_hanger001: THREE.Mesh;
    FishingRod_Lvl3_1: THREE.Mesh;
    FishingRod_Lvl3_2: THREE.Mesh;
    FishingRod_Lvl4_1: THREE.Mesh;
    FishingRod_Lvl4_2: THREE.Mesh;
    FishingRod_Lvl5_1: THREE.Mesh;
    FishingRod_Lvl5_2: THREE.Mesh;
  };
  materials: {
    ["White.003"]: THREE.MeshStandardMaterial;
    ["Wood.002"]: THREE.MeshStandardMaterial;
    ["White.001"]: THREE.MeshStandardMaterial;
    ["Grey.001"]: THREE.MeshStandardMaterial;
    water: THREE.MeshPhysicalMaterial;
    ["White.002"]: THREE.MeshStandardMaterial;
    White: THREE.MeshStandardMaterial;
    Wood: THREE.MeshStandardMaterial;
    Grey: THREE.MeshStandardMaterial;
    Red: THREE.MeshStandardMaterial;
    DarkRed: THREE.MeshStandardMaterial;
    LightMetal: THREE.MeshStandardMaterial;
    ["White.004"]: THREE.MeshStandardMaterial;
    ["Red.001"]: THREE.MeshStandardMaterial;
    ["DarkRed.003"]: THREE.MeshStandardMaterial;
    LightOrange: THREE.MeshStandardMaterial;
    ["Wood.003"]: THREE.MeshStandardMaterial;
    Metal: THREE.MeshStandardMaterial;
    ["White.017"]: THREE.MeshStandardMaterial;
    ["LightMetal.002"]: THREE.MeshStandardMaterial;
    ["Wood.004"]: THREE.MeshStandardMaterial;
    Wood_Light: THREE.MeshStandardMaterial;
    Wood_Dark: THREE.MeshStandardMaterial;
    ["Black.003"]: THREE.MeshStandardMaterial;
    ["Brown.009"]: THREE.MeshStandardMaterial;
    ["DarkGreen.003"]: THREE.MeshStandardMaterial;
    ["LightOrange.002"]: THREE.MeshStandardMaterial;
    ["Black.001"]: THREE.MeshStandardMaterial;
    ["Brown.007"]: THREE.MeshStandardMaterial;
    ["Plant_Green.002"]: THREE.MeshStandardMaterial;
    Black: THREE.MeshStandardMaterial;
    ["Brown.001"]: THREE.MeshStandardMaterial;
    Plant_Green: THREE.MeshStandardMaterial;
    ["LightOrange.003"]: THREE.MeshStandardMaterial;
    ["DarkRed.004"]: THREE.MeshStandardMaterial;
    floor: THREE.MeshStandardMaterial;
    toilet_floor: THREE.MeshStandardMaterial;
    ["toilet_wall.001"]: THREE.MeshStandardMaterial;
    ["wall.001"]: THREE.MeshStandardMaterial;
    ButtomPlate: THREE.MeshStandardMaterial;
    wood: THREE.MeshStandardMaterial;
    ["Metal.001"]: THREE.MeshStandardMaterial;
    ["Black.006"]: THREE.MeshStandardMaterial;
    ["Black.004"]: THREE.MeshStandardMaterial;
    Gold: THREE.MeshStandardMaterial;
    ["Black.005"]: THREE.MeshStandardMaterial;
    ["Red.002"]: THREE.MeshStandardMaterial;
  };
};

export default function Room(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/room.glb") as GLTFResult;
  const setIsBrowsingFood = useUIStore((state) => state.setIsBrowsingFood);
  const moveToLocation = useTamagotchiStore((state) => state.moveToLocation);
  const setCurrentAction = useTamagotchiStore(
    (state) => state.setCurrentAction
  );
  const setIsFreeze = useTamagotchiStore((state) => state.setIsFreeze);
  const isFreeze = useTamagotchiStore((state) => state.isFreeze);
  const currentFood = useTamagotchiStore((state) => state.currentFood);
  const setExitFocusMode = useCameraStore((state) => state.setExitFocusMode);
  const setEnterFocusMode = useCameraStore((state) => state.setEnterFocusMode);
  const positionOffset = useCameraStore((state) => state.positionOffset);
  const setCurrentObject = useObjectStore((state) => state.setCurrentObject);
  const currentObject = useObjectStore((state) => state.currentObject);
  const outlineColor = useObjectStore((state) => state.outlineColor);
  const [hovered, setHovered] = useState(false);

  const { controls }: { controls: CameraControls } = useThree();

  useCursor(hovered);

  useEffect(() => {
    setExitFocusMode(() => exitFocusMode(controls));
    setEnterFocusMode(() =>
      enterFocusMode(
        controls,
        new THREE.Vector3(
          3.2,
          2.46 + positionOffset.y,
          5.83 + positionOffset.z
        ),
        new THREE.Vector3(3.2, 0.46 + positionOffset.y, 2.83 + positionOffset.z)
      )
    );
  }, [controls]);

  // useControls({
  //   outlineColor: {
  //     value: outlineColor,
  //     onChange: (color) => {
  //       setOutlineColor(color);
  //     },
  //   },
  // });

  const doAction = (
    position: number[],
    rotation: number[],
    action: PetAction
  ) => {
    moveToLocation(
      new THREE.Vector3(position[0], position[1], position[2]),
      new THREE.Vector3(rotation[0], rotation[1], rotation[2])
    );
    setIsFreeze(true);
    setCurrentAction(action);
  };

  const PresetOutlines = () => {
    return <Outlines angle={0} color={outlineColor} scale={1} thickness={5} />;
  };

  return (
    <group {...props} dispose={null}>
      <group position={[3.2, 0.46, 2.83]}>
        {currentFood && <Food url={currentFood.model} scale={0.5} />}
        <mesh
          name="Plate"
          receiveShadow
          geometry={nodes.Plate.geometry}
          material={materials["White.003"]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[2.3, 2.3, 1]}
          onPointerOver={(e) => {
            setHovered(true);
            if (e.object.name) setCurrentObject(e.object as THREE.Mesh);
          }}
          onPointerOut={() => {
            setCurrentObject(null);
            setHovered(false);
          }}
          onPointerDown={(e) => {
            e.stopPropagation();

            if (!isFreeze) {
              doAction([3.23, 0, 1.26], [0, 0, 0], PetAction.Idle);
              setIsBrowsingFood(true);
            }
          }}
        >
          {currentObject?.name == "Plate" && (
            <Outlines
              angle={0}
              color={outlineColor}
              scale={1.1}
              thickness={2}
            />
          )}
        </mesh>
      </group>

      <mesh
        name="Table_RoundSmall"
        castShadow
        geometry={nodes.Table_RoundSmall.geometry}
        material={materials["Wood.002"]}
        position={[3.2, 0, 3.2]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1, 1, 0.4]}
      />
      <group
        name="Bathtub"
        position={[-3.85, 0, -2.86]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1.4, 1, 1.2]}
        onPointerOver={(e) => {
          setHovered(true);
          if (e.object.parent?.name)
            setCurrentObject(e.object.parent as THREE.Mesh);
        }}
        onPointerOut={() => {
          setCurrentObject(null);
          setHovered(false);
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          if (!isFreeze) {
            doAction(
              [-3.87, 0.43, -3.13],
              [0, Math.PI * 0.5, 0],
              PetAction.Bath
            );
          }
        }}
      >
        <mesh
          name="Bathroom_Bathtub"
          castShadow
          receiveShadow
          geometry={nodes.Bathroom_Bathtub.geometry}
          material={materials["White.001"]}
        >
          {currentObject?.name == "Bathtub" && <PresetOutlines />}
        </mesh>
        <mesh
          name="Bathroom_Bathtub_1"
          castShadow
          receiveShadow
          geometry={nodes.Bathroom_Bathtub_1.geometry}
          material={materials["Grey.001"]}
        >
          {currentObject?.name == "Bathtub" && <PresetOutlines />}
        </mesh>
        <mesh
          receiveShadow
          geometry={nodes.Bathroom_Bathtub_2.geometry}
          material={materials.water}
        />
      </group>
      <mesh
        name="Toilet"
        castShadow
        receiveShadow
        geometry={nodes.Toilet.geometry}
        material={materials["White.002"]}
        position={[-1.15, 0, -4.09]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerOver={(e) => {
          setHovered(true);
          if (e.object.name) setCurrentObject(e.object as THREE.Mesh);
        }}
        onPointerOut={() => {
          setCurrentObject(null);
          setHovered(false);
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          if (!isFreeze) {
            doAction([-1.15, 1, -3.8], [0, 0, 0], PetAction.Toilet);
          }
        }}
      >
        {currentObject?.name == "Toilet" && <PresetOutlines />}
      </mesh>
      <group
        name="Bed"
        position={[3.9, 0, -3]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerOver={(e) => {
          setHovered(true);
          if (e.object.parent?.name)
            setCurrentObject(e.object.parent as THREE.Mesh);
        }}
        onPointerOut={() => {
          setCurrentObject(null);
          setHovered(false);
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          if (!isFreeze) {
            doAction([3.93, 0.751, -3.31], [0, 0, 0], PetAction.Sleep);
          }
        }}
      >
        <mesh
          name="Bed_Single"
          castShadow
          receiveShadow
          geometry={nodes.Bed_Single.geometry}
          material={materials.White}
        >
          {currentObject?.name == "Bed" && <PresetOutlines />}
        </mesh>
        <mesh
          name="Bed_Single_1"
          castShadow
          receiveShadow
          geometry={nodes.Bed_Single_1.geometry}
          material={materials.Wood}
        >
          {currentObject?.name == "Bed" && <PresetOutlines />}
        </mesh>
        <mesh
          name="Bed_Single_2"
          castShadow
          receiveShadow
          geometry={nodes.Bed_Single_2.geometry}
          material={materials.Grey}
        >
          {currentObject?.name == "Bed" && <PresetOutlines />}
        </mesh>
        <mesh
          name="Bed_Single_3"
          castShadow
          receiveShadow
          geometry={nodes.Bed_Single_3.geometry}
          material={materials.Red}
        >
          {currentObject?.name == "Bed" && <PresetOutlines />}
        </mesh>
        <mesh
          name="Bed_Single_4"
          castShadow
          receiveShadow
          geometry={nodes.Bed_Single_4.geometry}
          material={materials.DarkRed}
        >
          {currentObject?.name == "Bed" && <PresetOutlines />}
        </mesh>
      </group>
      <group
        name="Bathroom_Towel"
        position={[-3.883, 2.177, -0.125]}
        rotation={[-Math.PI / 2, 0, -Math.PI]}
      >
        <mesh
          name="Bathroom_Towel_1"
          castShadow
          receiveShadow
          geometry={nodes.Bathroom_Towel_1.geometry}
          material={materials.LightMetal}
        />
        <mesh
          name="Bathroom_Towel_2"
          castShadow
          receiveShadow
          geometry={nodes.Bathroom_Towel_2.geometry}
          material={materials["White.004"]}
        />
        <mesh
          name="Bathroom_Towel_3"
          castShadow
          receiveShadow
          geometry={nodes.Bathroom_Towel_3.geometry}
          material={materials["Red.001"]}
        />
      </group>
      <group
        name="Carpet_1"
        position={[-1.001, 0.05, 0.882]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={0.698}
      >
        <mesh
          name="Carpet_1_1"
          castShadow
          receiveShadow
          geometry={nodes.Carpet_1_1.geometry}
          material={materials["DarkRed.003"]}
        />
        <mesh
          name="Carpet_1_2"
          castShadow
          receiveShadow
          geometry={nodes.Carpet_1_2.geometry}
          material={materials.LightOrange}
        />
      </group>
      <group
        name="NightStand_2"
        position={[2.119, 0, -4.455]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <mesh
          name="NightStand_2_1"
          castShadow
          receiveShadow
          geometry={nodes.NightStand_2_1.geometry}
          material={materials["Wood.003"]}
        />
        <mesh
          name="NightStand_2_2"
          castShadow
          receiveShadow
          geometry={nodes.NightStand_2_2.geometry}
          material={materials.Metal}
        />
      </group>
      <group
        name="Light_Floor2"
        position={[2.139, 0.946, -4.674]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <mesh
          name="Light_Floor2_1"
          castShadow
          receiveShadow
          geometry={nodes.Light_Floor2_1.geometry}
          material={materials["White.017"]}
        />
        <mesh
          name="Light_Floor2_2"
          castShadow
          receiveShadow
          geometry={nodes.Light_Floor2_2.geometry}
          material={materials["LightMetal.002"]}
        />
      </group>
      <group position={[-3.492, 0, 0.673]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Drawer_5_1.geometry}
          material={materials["Wood.004"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Drawer_5_2.geometry}
          material={materials.Wood_Light}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Drawer_5_3.geometry}
          material={materials.Wood_Dark}
        />
      </group>
      <group position={[-3.734, 1.339, 0.634]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Houseplant_2001.geometry}
          material={materials["Black.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Houseplant_2001_1.geometry}
          material={materials["Brown.009"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Houseplant_2001_2.geometry}
          material={materials["DarkGreen.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Houseplant_2001_3.geometry}
          material={materials["LightOrange.002"]}
        />
      </group>
      <group position={[-3.4, 1.34, 0.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Houseplant_4_1.geometry}
          material={materials["Black.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Houseplant_4_2.geometry}
          material={materials["Brown.007"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Houseplant_4_3.geometry}
          material={materials["Plant_Green.002"]}
        />
      </group>
      <group
        position={[-4.256, 1.339, 0.633]}
        rotation={[-Math.PI / 2, 0, -0.758]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Houseplant_7_1.geometry}
          material={materials.Black}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Houseplant_7_2.geometry}
          material={materials["Brown.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Houseplant_7_3.geometry}
          material={materials.Plant_Green}
        />
      </group>
      <group
        name="Carpet_Round"
        position={[3.2, 0.05, 3.2]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.37}
      >
        <mesh
          name="Carpet_Round_1"
          castShadow
          receiveShadow
          geometry={nodes.Carpet_Round_1.geometry}
          material={materials["LightOrange.003"]}
        />
        <mesh
          name="Carpet_Round_2"
          castShadow
          receiveShadow
          geometry={nodes.Carpet_Round_2.geometry}
          material={materials["DarkRed.004"]}
        />
      </group>
      <mesh
        name="floor"
        castShadow
        receiveShadow
        geometry={nodes.floor.geometry}
        material={materials.floor}
        material-depthWrite={false}
        position={[0, 5, 0]}
      />
      <mesh
        name="toilet_floor"
        castShadow
        receiveShadow
        geometry={nodes.toilet_floor.geometry}
        material={materials.toilet_floor}
        material-depthWrite={false}
        position={[-2.5, 2.5, -2.5]}
      />
      <mesh
        name="toilet_wall001"
        castShadow
        receiveShadow
        geometry={nodes.toilet_wall001.geometry}
        material={materials["toilet_wall.001"]}
        position={[-2.5, 2.5, -2.5]}
      />
      <group name="wall001" position={[0, 5, 0]}>
        <mesh
          name="Cube006"
          castShadow
          receiveShadow
          geometry={nodes.Cube006.geometry}
          material={materials["wall.001"]}
        />
        <mesh
          name="Cube006_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube006_1.geometry}
          material={materials.ButtomPlate}
        />
      </group>
      <group name="FishingRods">
        <mesh
          name="fishingRod_hanger001"
          castShadow
          receiveShadow
          geometry={nodes.fishingRod_hanger001.geometry}
          material={materials.wood}
          position={[-4.968, 2.989, 3.037]}
        />
        <group
          name="FishingRod_Lvl3"
          position={[-4.89, 3.494, 1.704]}
          rotation={[0, 0, Math.PI]}
          scale={[0.4, 0.4, 0.45]}
        >
          <mesh
            name="FishingRod_Lvl3_1"
            castShadow
            receiveShadow
            geometry={nodes.FishingRod_Lvl3_1.geometry}
            material={materials["Metal.001"]}
          />
          <mesh
            name="FishingRod_Lvl3_2"
            castShadow
            receiveShadow
            geometry={nodes.FishingRod_Lvl3_2.geometry}
            material={materials["Black.006"]}
          />
        </group>
        <group
          name="FishingRod_Lvl4"
          position={[-4.89, 3, 1.9]}
          rotation={[0, 0, -3.124]}
          scale={0.4}
        >
          <mesh
            name="FishingRod_Lvl4_1"
            castShadow
            receiveShadow
            geometry={nodes.FishingRod_Lvl4_1.geometry}
            material={materials["Black.004"]}
          />
          <mesh
            name="FishingRod_Lvl4_2"
            castShadow
            receiveShadow
            geometry={nodes.FishingRod_Lvl4_2.geometry}
            material={materials.Gold}
          />
        </group>
        <group
          name="FishingRod_Lvl5"
          position={[-4.89, 2.558, 1.9]}
          rotation={[0, 0, Math.PI]}
          scale={[0.4, 0.4, 0.373]}
        >
          <mesh
            name="FishingRod_Lvl5_1"
            castShadow
            receiveShadow
            geometry={nodes.FishingRod_Lvl5_1.geometry}
            material={materials["Black.005"]}
          />
          <mesh
            name="FishingRod_Lvl5_2"
            castShadow
            receiveShadow
            geometry={nodes.FishingRod_Lvl5_2.geometry}
            material={materials["Red.002"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/room.glb");
