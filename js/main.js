/* https://s3.amazonaws.com/freecodecamp/simonSound1.mp3,
https://s3.amazonaws.com/freecodecamp/simonSound2.mp3,
https://s3.amazonaws.com/freecodecamp/simonSound3.mp3,
https://s3.amazonaws.com/freecodecamp/simonSound4.mp3.  */
function init() {
   
   listener("add", "id", "onOff", onAndOff);
 //   listener("add", "id", "onOffPanel", onAndOff);

}
// var styleSheetList = document.styleSheets;

function listener(addOrRemove, prop, selector, func) {
    var op = addOrRemove;
    if (prop === "class") {
        var sels = document.querySelectorAll(selector);
        for (var i = 0; i < sels.length; i++) {
            if (op === "add") { sels[i].addEventListener("click", func); }
            else if (op === "remove") { sels[i].removeEventListener("click", func); }
        }
    }
    if (prop === "id") {
        var el = document.getElementById(selector);
        if (op === "add") {  el.addEventListener("click", func); }
        else if (op === "remove") { el.removeEventListener("click", func); }
    }
}
function onAndOff(e) {

   if ( e.target.classList.contains("onOff")) {
   //  alert("off");
      //dectivate start button
   e.target.classList.remove("onOff"); 
  document.getElementById("start").style = "background:rgba(255,255,255, 0.5)";
    listener("remove", "id", "start", start);
     listener("remove", "id", "green", play);    
    listener("remove", "id", "red", play);
    listener("remove", "id", "blue", play);
    listener("remove", "id", "yellow", play);
  
 }
  else {
   //  alert("on");
     e.target.classList.add("onOff");   
   
      //activate start button
       listener("add", "id", "start", start);
       //activate strict button
       listener("add", "id", "strict", strict);
    
  }
  }
  function start(e) {
    listener("add", "id", "green", play);    
    listener("add", "id", "red", play);
    listener("add", "id", "blue", play);
    listener("add", "id", "yellow", play);
      e.target.style = "background:#42A5F5";
       document.getElementById("strict").style = "background:rgba(255,255,255, 0.5)";
  //  document.stylesheets[0].addRule('.button:active');
  //   styleSheetList[0].addRule('.button:active');

   // CSSStyleSheet.insertRule('.button:active { transform: scale(0.8); transform-origin: center;}', 0);
   // document.getElementById("start").classList.add("active");
   //  document.getElementById("strict").classList.add("active");
}
function strict(e) {
   e.target.style = "background:#42A5F5";
    document.getElementById("start").style = "background:rgba(255,255,255, 0.5)";

}
function stop() {
  listener("remove", "id", "green", play);    
    listener("remove", "id", "red", play);
    listener("remove", "id", "blue", play);
    listener("remove", "id", "yellow", play);
 //   styleSheetList[0]//.deleteRule('.button:active');
  //  document.stylesheets[0].deleteRule('.button:active');
 // CSSStyleSheet.deleteRule()
 //   document.getElementById("start").classList.remove("active");
  //  document.getElementById("strict").classList.remove("active");
}
function play(e) {
  var audio;
  if (e.target.id === "green" ) {
    audio = document.getElementById("simonSound4");
    e.target.style = "background-image: radial-gradient(circle at 14% 14%, rgba(255, 255, 255, 0.7), teal 33%);";
    setTimeout(function(audio) {
      e.target.style = "background-image: radial-gradient(circle at 14% 14%, rgba(255, 255, 255, 0.7), green 33%); ";
    }, 1000);
  }
  if (e.target.id === "red" ) {
    audio = document.getElementById("simonSound3");
  }
  if (e.target.id === "blue" ) {
    audio = document.getElementById("simonSound1");
  }
  if (e.target.id === "yellow" ) {
    	audio = document.getElementById("simonSound2");
  }
  audio.play();



}
init();
