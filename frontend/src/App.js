import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WebcamStreamCapture from "./components/WebStreamCapture.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx"
// import VideosGrid from "./components/VideosGrid.jsx";
import QuestionSelection from "./components/Questions";
import FileUpload from './components/FileUpload/FileUploader';
import { Container } from 'react-bootstrap';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';


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
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </Router>


  );
}
export default App;
