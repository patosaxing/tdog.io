import WebcamStreamCapture from "./Components/WebStreamCapture";
import QuestionSelection from "./Components/Questions";
// import Webcam from "react-webcam";
//THis is a test
function App() {
  return (
    <div className="App">
      <QuestionSelection/>
      <WebcamStreamCapture/>
    </div>
  );
}

export default App;
