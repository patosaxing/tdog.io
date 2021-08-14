export default function Slider({ timer, handleTimer }) {
  const styleObj = {
    width: "20rem",
    margin: '0.5rem',
    justifyContent: 'center'
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
      <div style={styleObj} > Set recording ⏱️: {timer} minutes</div>
    </div>
  );
}
