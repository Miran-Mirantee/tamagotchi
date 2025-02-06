import { useEffect, useRef } from "react";
import useUIStore from "../stores/useUIStore";
import useTamagotchiStore, { Food } from "../stores/useTamagotchiStore";
import Cheeseburger from "./Cheeseburger";
import Donut from "./Donut";

const UI = () => {
  const back = useUIStore((state) => state.back);
  const isInside = useUIStore((state) => state.isInside);
  const hunger = useTamagotchiStore((state) => state.hunger);
  const energy = useTamagotchiStore((state) => state.energy);
  const happiness = useTamagotchiStore((state) => state.happiness);
  const maxHunger = useTamagotchiStore((state) => state.maxHunger);
  const maxEnergy = useTamagotchiStore((state) => state.maxEnergy);
  const maxHappiness = useTamagotchiStore((state) => state.maxHappiness);
  const feed = useTamagotchiStore((state) => state.feed);
  const setCurrentFood = useTamagotchiStore((state) => state.setCurrentFood);
  const isEating = useTamagotchiStore((state) => state.isEating);
  const setBaseModelPath = useTamagotchiStore(
    (state) => state.setBaseModelPath
  );
  const uiContainerRef = useRef<HTMLDivElement>(null);
  const backBtnRef = useRef<HTMLButtonElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const burger: Food = {
    name: "burger",
    Model: Cheeseburger,
    hunger: 50,
    energy: 20,
    happiness: 10,
  };

  const donut: Food = {
    name: "burger",
    Model: Donut,
    hunger: 10,
    energy: 40,
    happiness: 50,
  };

  useEffect(() => {
    if (isInside) {
      uiContainerRef.current!.style.opacity = "1";
      backBtnRef.current!.style.pointerEvents = "all";
      statusRef.current!.style.pointerEvents = "all";
    } else {
      uiContainerRef.current!.style.opacity = "0";
      backBtnRef.current!.style.pointerEvents = "none";
      statusRef.current!.style.pointerEvents = "none";
    }
  }, [isInside]);

  return (
    <div className="ui-container" ref={uiContainerRef}>
      <button className="back-btn" ref={backBtnRef} onClick={back}>
        Go back
      </button>
      <div className="status" ref={statusRef}>
        <div className="need">
          <span>Hunger: </span>
          <progress value={hunger} max={maxHunger} />
          <span>
            {hunger} / {maxHunger}
          </span>
        </div>
        <div className="need">
          <span>Energy: </span>
          <progress value={energy} max={maxEnergy} />
          <span>
            {energy} / {maxEnergy}
          </span>
        </div>
        <div className="need">
          <span>Happiness: </span>
          <progress value={happiness} max={maxHappiness} />
          <span>
            {happiness} / {maxHappiness}
          </span>
        </div>

        <button
          onClick={() => {
            if (!isEating) {
              setCurrentFood(burger);
              feed();
            }
          }}
        >
          feed burger
        </button>
        <button
          onClick={() => {
            if (!isEating) {
              setCurrentFood(donut);
              feed();
            }
          }}
        >
          feed donut
        </button>
        <button
          onClick={() => {
            setBaseModelPath("./models/pet/Cat.glb");
          }}
        >
          Cat
        </button>
        <button
          onClick={() => {
            setBaseModelPath("./models/pet/Pigeon.glb");
          }}
        >
          Pigeon
        </button>
        <button
          onClick={() => {
            setBaseModelPath("./models/pet/Slime.glb");
          }}
        >
          Slime
        </button>
        <button
          onClick={() => {
            setBaseModelPath("./models/pet/Chicken.glb");
          }}
        >
          Chicken
        </button>
        <button
          onClick={() => {
            setBaseModelPath("./models/pet/Orc.glb");
          }}
        >
          Orc
        </button>
        <button
          onClick={() => {
            setBaseModelPath("./models/pet/Alien.glb");
          }}
        >
          Alien
        </button>
        <button
          onClick={() => {
            setBaseModelPath("./models/pet/Fish.glb");
          }}
        >
          Fish
        </button>
        <button
          onClick={() => {
            setBaseModelPath("./models/pet/Birb.glb");
          }}
        >
          Birb
        </button>
        <button
          onClick={() => {
            setBaseModelPath("./models/pet/Mushnub.glb");
          }}
        >
          Mushnub
        </button>
      </div>
    </div>
  );
};

export default UI;
