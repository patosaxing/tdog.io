import WebcamStreamCapture from "./Components/WebStreamCapture.jsx";
import AppBar from "./Components/AppBar.jsx";
import VideosGrid from "./Components/VideosGrid.jsx";
import QuestionSelection from "./Components/Questions";


function App() {
  return (
    <div className="App">
      <AppBar />
      <WebcamStreamCapture />
      <QuestionSelection/>
      <VideosGrid />
    </div>
  );
  }
export default App;
