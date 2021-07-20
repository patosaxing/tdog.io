import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx"
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';


function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </Router>


  );
}
export default App;
