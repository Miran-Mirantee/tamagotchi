import useUIStore from "../stores/useUIStore";

const UI = () => {
  const back = useUIStore((state) => state.back);

  return (
    <div className="ui-container">
      <button className="back-btn" onClick={back}>
        Go back
      </button>
    </div>
  );
};

export default UI;
