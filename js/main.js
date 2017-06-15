function init() {   
  // listener("add", "id", "onOff", onAndOff); // uncomment this if on-off switch should function
   listener("add", "id", "start", "click", start); // comment this out if on-off switch should function
   listener("add", "id", "reset", "click", reset); // comment this out if on-off switch should function
   listener("add", "id", "strict", "click", strict); // comment this out if on-off switch should function
}
var greenAudio = document.createElement('audio'),
    redAudio = document.createElement('audio'),
    yellowAudio = document.createElement('audio'),
    blueAudio = document.createElement('audio');
  
    greenAudio.setAttribute('src','https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    redAudio.setAttribute('src','https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    yellowAudio.setAttribute('src','https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    blueAudio.setAttribute('src','https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');


function listener(addOrRemove, prop, selector, event, func) {
    var op = addOrRemove;
    if (prop === "class") {
        var sels = document.querySelectorAll(selector);
        for (var i = 0; i < sels.length; i++) {
            if (op === "add") { sels[i].addEventListener(event, func); }
            else if (op === "remove") { sels[i].removeEventListener(event, func); }
        }
  }
  if (prop === "id") {
      var el = document.getElementById(selector);
      if (op === "add") {  el.addEventListener(event, func); }
      else if (op === "remove") { el.removeEventListener(event, func); }
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
        listener("add", "id", "start", "click", start);
        // activate reset button
         listener("add", "id", "reset", "click", reset); 
        //activate strict button
        listener("add", "id", "strict", "click", strict);    
    }
}
function start(e) {
   // e.target.style = "background:#42A5F5";
    listener("add", "id", "green", "click", play);    
    listener("add", "id", "red", "click", play);
    listener("add", "id", "blue", "click", play);
    listener("add", "id", "yellow", "click", play);
    
    document.getElementById("strict").style = "background:rgba(255,255,255, 0.5)";
}
function strict(e) {
    e.target.style = "background:#42A5F5";
   // document.getElementById("start").style = "background:rgba(255,255,255, 0.5)";

}
function reset(e) {
     document.getElementById("strict").style = "background:rgba(255,255,255, 0.5)";
}
function stop() {
    listener("remove", "id", "start", "click", start);
    listener("remove", "id", "green", "click", play);    
    listener("remove", "id", "red", "click", play);
    listener("remove", "id", "blue", "click", play);
    listener("remove", "id", "yellow", "click", play);
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
