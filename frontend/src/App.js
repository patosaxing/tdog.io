import WebcamStreamCapture from "./Components/WebStreamCapture.jsx";
import AppBar from "./Components/AppBar.jsx";
import VideosGrid from "./Components/VideosGrid.jsx";
import QuestionSelection from "./Components/Questions";
import FileUpload from './Components/FileUpload/FileUploader';


function App() {
  return (
    <div className="App">
      <AppBar />
      <QuestionSelection />
      <WebcamStreamCapture />
      <FileUpload />
      <VideosGrid />
    </div>
  );
}
export default App;
