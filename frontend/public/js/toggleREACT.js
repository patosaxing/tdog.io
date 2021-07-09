const showReact = ()=> {
  document.getElementById("reactSec").classList.remove("hideReact");
  document.getElementById("reactSec").classList.add("showReact");
  // ask for webcam
};
const hideReact = ()=> {
  document.getElementById("reactSec").classList.remove("showReact");
  document.getElementById("reactSec").classList.add("hideReact");
  // hide webcam "asking permission"
}