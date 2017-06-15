function init() {   
  // listener("add", "id", "onOff", onAndOff); // uncomment this if on-off switch should function
   listener("add", "id", "start", start); // comment this out if on-off switch should function
   listener("add", "id", "strict", strict); // comment this out if on-off switch should function
}
var greenAudio = document.createElement('audio'),
    redAudio = document.createElement('audio'),
    yellowAudio = document.createElement('audio'),
    blueAudio = document.createElement('audio');
  
    greenAudio.setAttribute('src','https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    redAudio.setAttribute('src','https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    yellowAudio.setAttribute('src','https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    blueAudio.setAttribute('src','https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');


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
        stop();
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
    e.target.style = "background:#42A5F5";
    listener("add", "id", "green", play);    
    listener("add", "id", "red", play);
    listener("add", "id", "blue", play);
    listener("add", "id", "yellow", play);
    
    document.getElementById("strict").style = "background:rgba(255,255,255, 0.5)";
}
function strict(e) {
    e.target.style = "background:#42A5F5";
    document.getElementById("start").style = "background:rgba(255,255,255, 0.5)";

}
function stop() {
    listener("remove", "id", "start", start);
    listener("remove", "id", "green", play);    
    listener("remove", "id", "red", play);
    listener("remove", "id", "blue", play);
    listener("remove", "id", "yellow", play);
}
function play(e) {
    var audio, target, origStyle, playStyle;
    target = e.target;
    origStyle = target.style;
    if (target.id === "green" ) {
        greenAudio.play();
    }
    if (e.target.id === "red" ) {
        redAudio.play();
    }
    if (e.target.id === "blue" ) {
        blueAudio.play();
    }
    if (e.target.id === "yellow" ) {
        yellowAudio.play();
    }
}

init();
