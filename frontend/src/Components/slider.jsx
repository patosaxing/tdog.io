export default function Slider({ timer, handleTimer }) {
  return (
    <div className="slidercontainer">
      <input
        type="range"
        min={0}
        max={5}
        value={timer}
        onChange={handleTimer}
        step={0.5}
        className="slider"
        style={{ width: "15rem" }}
      ></input>
      <div>⏱️ Set recording time: {timer} minutes</div>
    </div>
  );
}
