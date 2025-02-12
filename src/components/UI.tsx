import { useEffect, useRef } from "react";
import useUIStore from "../stores/useUIStore";
import useCameraStore from "../stores/useCameraStore";
import useTamagotchiStore, {
  Food,
  PetAction,
} from "../stores/useTamagotchiStore";
import food from "../json/food.json";

const UI = () => {
  const back = useUIStore((state) => state.back);
  const isInside = useUIStore((state) => state.isInside);
  const isBrowsingFood = useUIStore((state) => state.isBrowsingFood);
  const setIsBrowsingFood = useUIStore((state) => state.setIsBrowsingFood);
  const hunger = useTamagotchiStore((state) => state.hunger);
  const energy = useTamagotchiStore((state) => state.energy);
  const happiness = useTamagotchiStore((state) => state.happiness);
  const bladder = useTamagotchiStore((state) => state.bladder);
  const hygiene = useTamagotchiStore((state) => state.hygiene);
  const maxHunger = useTamagotchiStore((state) => state.maxHunger);
  const maxEnergy = useTamagotchiStore((state) => state.maxEnergy);
  const maxHappiness = useTamagotchiStore((state) => state.maxHappiness);
  const maxBladder = useTamagotchiStore((state) => state.maxBladder);
  const maxHygiene = useTamagotchiStore((state) => state.maxHygiene);
  const feed = useTamagotchiStore((state) => state.feed);
  const setCurrentFood = useTamagotchiStore((state) => state.setCurrentFood);
  const currentAction = useTamagotchiStore((state) => state.currentAction);
  const setCurrentAction = useTamagotchiStore(
    (state) => state.setCurrentAction
  );
  const setIsFreeze = useTamagotchiStore((state) => state.setIsFreeze);
  const setBaseModelPath = useTamagotchiStore(
    (state) => state.setBaseModelPath
  );
  const exitFocusMode = useCameraStore((state) => state.exitFocusMode);
  const uiContainerRef = useRef<HTMLDivElement>(null);
  const backBtnRef = useRef<HTMLButtonElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

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

  const Need = ({
    label,
    value,
    maxValue,
  }: {
    label: string;
    value: number;
    maxValue: number;
  }) => {
    return (
      <div className="need">
        <span>{label} </span>
        <progress value={value} max={maxValue} />
        <span>
          {value} / {maxValue}
        </span>
      </div>
    );
  };

  const onStopFeedingClick = () => {
    setIsBrowsingFood(false);
    exitFocusMode();
  };

  const FoodItem = ({ food }: { food: Food }) => {
    return (
      <button
        className="food-item"
        title={food.name}
        onClick={() => {
          if (currentAction != PetAction.Eat) {
            setCurrentFood(food);
            feed();
          }
        }}
      >
        <img src={food.thumbnail} alt={food.name} />
      </button>
    );
  };

  return (
    <div className="ui-container" ref={uiContainerRef}>
      {!isBrowsingFood && (
        <button className="back-btn" ref={backBtnRef} onClick={back}>
          Go back
        </button>
      )}
      <div className="status" ref={statusRef}>
        <Need label={"Hunger:"} value={hunger} maxValue={maxHunger} />
        <Need label={"Energy:"} value={energy} maxValue={maxEnergy} />
        <Need label={"Happiness:"} value={happiness} maxValue={maxHappiness} />
        <Need label={"Bladder:"} value={bladder} maxValue={maxBladder} />
        <Need label={"Hygiene:"} value={hygiene} maxValue={maxHygiene} />
      </div>
      <div className="debug">
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
        <button
          onClick={() => {
            setIsFreeze(false);
          }}
        >
          Unfreeze
        </button>
        <button
          onClick={() => {
            if (currentAction != PetAction.Sleep) return;
            setCurrentAction(PetAction.WakeUp);
          }}
        >
          Wake up
        </button>
      </div>

      {isBrowsingFood && (
        <div className="food-ui">
          <div className="food-container">
            {food.map((food: Food, index) => (
              <FoodItem key={index} food={food} />
            ))}
          </div>
          <button
            className="food-back-btn"
            onClick={onStopFeedingClick}
            disabled={currentAction == PetAction.Eat}
          >
            Stop feeding
          </button>
        </div>
      )}
    </div>
  );
};

export default UI;
