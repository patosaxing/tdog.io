import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx"
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen';
import ForgotpasswordScreen from './screens/ForgotpasswordScreen';
import ResetPasswordScreen from "./screens/ResetPasswordScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/register' component={RegisterScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/' component={HomeScreen} exact />
          <Route path='/forgotpassword' component={ForgotpasswordScreen} exact />
          <Route path='/passwordreset/:resetToken' component={ResetPasswordScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}
export default App;
