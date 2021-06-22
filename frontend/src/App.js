//import RecordVideo from "./Components/RecordVideo";
import WebcamStreamCapture from "./Components/WebStreamCapture";

function App() {
  return (
    <div className="App">
      {/* <Webcam audio="true" /> */}
      {/* <button>Record</button> */}
      <WebcamStreamCapture/>
    </div>
  );
}

export default App;
