export default function Slider({ timer, handleTimer }) {
  const styleObj = {
    width: "17rem",
  };
  return (
    // <div className="slidercontainer">
    <div >
      <input
        type="range"
        min={0}
        max={5}
        value={timer}
        onChange={handleTimer}
        step={0.5}
        className="slider"
        style={styleObj}
      ></input>
      <div>⏱️ Set recording time: {timer} minutes</div>
    </div>
  );
}
