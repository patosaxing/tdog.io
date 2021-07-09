const axios = require('axios').default;
// import axios from "axios";

const loginform = document.getElementById('login-form');
const loginButton = document.getElementById('login-form-submit');


const showReact = (e) => {
  e.preventDefault();
  const email = loginform.usrname.value;
  const password = loginform.psw.value;

  console.log('Email', email);
  console.log('paswrod', password);

  // send the detail to BE via POST request
  // const loggedIn = async () => {
  //   try {
  //     axios.post('/api/login', {
  //       email,
  //       password,
  //     })
  //       .then(function (response) {
  //         console.log(response);
  //         response.send('Logged in as ', email);
  //       })

  //   } catch (error) {
  //     console.log('Error', error.message);

  //   }
  // }


  document.getElementById("reactSec").classList.remove("hideReact");
  document.getElementById("reactSec").classList.add("showReact");
  // ask for webcam
};
const hideReact = () => {
  document.getElementById("reactSec").classList.remove("showReact");
  document.getElementById("reactSec").classList.add("hideReact");
  // hide webcam "asking permission"
}

loginButton.addEventListener('click', showReact);