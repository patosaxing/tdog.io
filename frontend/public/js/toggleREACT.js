const loginform = document.getElementById('login-form');
const loginButton = document.getElementById('login-form-submit');

const showReact = () => {

  const email = loginform.email.value;
  const password = loginform.psw.value;

  console.log('Email', email);
  console.log('paswrod', password);

  // document.getElementById("reactSec").classList.remove("hideReact");
  // document.getElementById("reactSec").classList.add("showReact");
  // ask for webcam
};
const hideReact = () => {
  document.getElementById("reactSec").classList.remove("showReact");
  document.getElementById("reactSec").classList.add("hideReact");
  // hide webcam "asking permission"
}