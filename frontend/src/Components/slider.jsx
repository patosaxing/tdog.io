export default function Slider({ timer, handleTimer }) {
  const styleObj = {
    width: "17rem",
    // background: '#d3d3d3',
    // backgroundColor:'black',
    // outline: "none",
    // opacity: "0.7"
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
