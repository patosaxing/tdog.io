// const loginform = document.getElementById('login-form');
const loginButton = document.getElementById('login-form-submit');
// const email = loginform.userEmail.value;
// const password = loginform.psw.value;

loginButton.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById("reactSec").classList.remove("hideReact");
  document.getElementById("reactSec").classList.add("showReact");
});
// const showReact = () => {
//   document.getElementById("reactSec").classList.remove("hideReact");
//   document.getElementById("reactSec").classList.add("showReact");
// };

const hideReact = () => {
  document.getElementById("reactSec").classList.remove("showReact");
  document.getElementById("reactSec").classList.add("hideReact");
  // hide webcam "asking permission"
};