import WebcamStreamCapture from "./Components/WebStreamCapture.jsx";
// import AppBar from "./Components/AppBar.jsx";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx"
import VideosGrid from "./Components/VideosGrid.jsx";
import QuestionSelection from "./Components/Questions";
import FileUpload from './Components/FileUpload/FileUploader';
import {Container} from 'react-bootstrap';
import { Router } from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';


function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <QuestionSelection />
        <WebcamStreamCapture />
        <FileUpload />
        <VideosGrid />
        </Container>
      </main>
      <Footer />
    </Router>
     
      
  );
}
export default App;
