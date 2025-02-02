import useUIStore from "../stores/useUIStore";
import useTamagotchiStore, { Food } from "../stores/useTamagotchiStore";
import Cheeseburger from "./Cheeseburger";
import Donut from "./Donut";

const UI = () => {
  const back = useUIStore((state) => state.back);
  const hunger = useTamagotchiStore((state) => state.hunger);
  const energy = useTamagotchiStore((state) => state.energy);
  const happiness = useTamagotchiStore((state) => state.happiness);
  const feed = useTamagotchiStore((state) => state.feed);
  const setCurrentFood = useTamagotchiStore((state) => state.setCurrentFood);
  const isEating = useTamagotchiStore((state) => state.isEating);

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

  return (
    <div className="ui-container">
      <button className="back-btn" onClick={back}>
        Go back
      </button>
      <div className="status">
        <div>Hunger: {hunger}</div>
        <div>Energy: {energy}</div>
        <div>Happiness: {happiness}</div>
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
      </div>
    </div>
  );
};

export default UI;
