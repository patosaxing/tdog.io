import WebcamStreamCapture from "./Components/WebStreamCapture.jsx";
import AppBar from "./Components/AppBar.jsx";
import VideosGrid from "./Components/VideosGrid.jsx";


function App() {
  return (
    <div className="App">
      <AppBar />
      <WebcamStreamCapture />
      <VideosGrid />
    </div>
  );
}

export default App;
