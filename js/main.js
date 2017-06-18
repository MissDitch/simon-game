function init() {   
  // listener("add", "id", "onOff", onAndOff); // uncomment this if on-off switch should function
   listener("add", "id", "start", "click", start); // comment this out if on-off switch should function
   listener("add", "id", "reset", "click", reset); // comment this out if on-off switch should function
   listener("add", "id", "strict", "click", strict); // comment this out if on-off switch should function
}

const greenAudio = document.createElement('audio'),
    redAudio = document.createElement('audio'),
    yellowAudio = document.createElement('audio'),
    blueAudio = document.createElement('audio');
  
    greenAudio.setAttribute('src','https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    redAudio.setAttribute('src','https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    yellowAudio.setAttribute('src','https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    blueAudio.setAttribute('src','https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

const str1 =  "background-image: radial-gradient(circle at ";
const str2 = ", rgba(255, 255, 255, 0.7), ";
const str3 = " 33%);";
const greenActivestr = str1 + "19% 19%" + str2 + "#3ad146" + str3;
const greenDefaultstr = str1 + "19% 19%" + str2 + "#22992c" + str3;

const redActivestr = str1 + "27% 27%" + str2 + "#f62f18" + str3;
const redDefaultstr = str1 + "27% 27%" + str2 + "#c41a06" + str3;

const blueActivestr = str1 + "19% 19%" + str2 + "#00a7ee" + str3;
const blueDefaultstr = str1 + "19% 19%" + str2 + "#0574a3" + str3;

const yellowActivestr = str1 + "27% 27%" + str2 + "#fee73b" + str3;
const yellowDefaultstr = str1 + "27% 27%" + str2 + "#c2ab01" + str3;

var Petal = function(audio, id, defaultStyle, lightStyle) {   
    var self = this,
   // defaultStyle = defaultStyle,
    lightStyle = lightStyle;
 //   isPlaying = audio.currentTime > 0 && !audio.paused && !audio.ended && audio.readyState > 2;

    this.audio = audio;
 //   this.isPlaying = isPlaying;
    this.id = id;
    this.defaultStyle = defaultStyle;
    //this.lightStyle = lightStyle;
    this.simonPlayLight = function() {
      //  if (!isPlaying) {
          setTimeout(function(){
             self.audio.play();
                document.getElementById(id).style = lightStyle;    
                //self.stop(id, defaultStyle);  
                setTimeout(function() {
                var id = self.id, defaultStyle = self.defaultStyle;
                document.getElementById(id).style = defaultStyle;
                //self.audio.pause();
                }, 500); 
          }, 150);
    } 
}

const greenPetal = new Petal(greenAudio, "green", greenDefaultstr, greenActivestr);
const redPetal = new Petal(redAudio, "red", redDefaultstr, redActivestr);
const bluePetal = new Petal(blueAudio, "blue", blueDefaultstr, blueActivestr);
const yellowPetal = new Petal(yellowAudio, "yellow", yellowDefaultstr, yellowActivestr);

const petalArray = [greenPetal, redPetal, bluePetal, yellowPetal];




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
        //simonStopLight();
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
    document.getElementById("strict").style = "background:rgba(255,255,255, 0.5)";
    document.getElementById("score").textContent = "--";
    addSound();
}
function strict(e) {
    e.target.style = "background:#42A5F5";
   // document.getElementById("start").style = "background:rgba(255,255,255, 0.5)";

}
function reset(e) {   
    simonArr = [];  
    counter = 0;  
    clickCount = 0;  
    scoreCount = 0;  
    start();
}
function disableClick() {
    clickable = false;
    document.getElementById("green").classList.remove("hasActive");
    document.getElementById("red").classList.remove("hasActive");
    document.getElementById("blue").classList.remove("hasActive");
    document.getElementById("yellow").classList.remove("hasActive");
    listener("remove", "id", "green", "click", playOnClick);    
    listener("remove", "id", "red", "click", playOnClick);
    listener("remove", "id", "blue", "click", playOnClick);
    listener("remove", "id", "yellow", "click", playOnClick);
}
function enableClick() {
    clickable = true;
    document.getElementById("green").classList.add("hasActive");
    document.getElementById("red").classList.add("hasActive");
    document.getElementById("blue").classList.add("hasActive");
    document.getElementById("yellow").classList.add("hasActive");
    listener("add", "id", "green", "click", playOnClick);    
    listener("add", "id", "red", "click", playOnClick);
    listener("add", "id", "blue", "click", playOnClick);
    listener("add", "id", "yellow", "click", playOnClick);
}
function playOnClick(e) {
    var id = e.target.id, int, message;   
    
    switch (id) {
        case "green": int = 0;             
            break;
        case "red": int = 1;          
            break;
         case "blue": int = 2;          
            break;
        case "yellow": int = 3;                  
            break;
    }
    petalArray[int].simonPlayLight();            
   // petalArray[int].simonStopLight();
    //compare:
    if (clickCount < simonArr.length) {
        if (int === simonArr[clickCount]) {
           // alert(" right! ");        
            clickCount++;  
            if (clickCount === simonArr.length) {
                setTimeout(function() {
                    addSound();
                }, 1500);
                
            }       
        }
        else {
            message = document.getElementById("message");
            message.classList.add("active");
            message.textContent = "You have made a mistake! Listen and try again.";
            timeoutID2 = setTimeout(function() {
                message = document.getElementById("message");
                message.classList.remove("active");                 
            }, 1500);
            counter = 0;
            clickCount = 0;
            setTimeout(function() {
                simonPlay(); 
            }, 1500);  
        }   
    }
    else {
        setTimeout(function() {
            addSound();
        }, 1500);
    } 


}

var simonArr = [];  // store randomly generated sound/light
var counter = 0;  // counter corresponds to position in simonArr
var clickCount = 0;  // counter of user's clicks
var scoreCount = 0;  // corresponds to number of sounds in simonArr

// generate a new sound and add it to the array, then play all of them
function addSound() {
    var score = document.getElementById("score");
    disableClick();   
    setTimeout(function() {          
        var int = Math.floor(Math.random() * 4); 
        simonArr.push(int);
        scoreCount++;   
        scoreCount < 10 ? score.textContent = "0" + scoreCount
        : score.textContent = scoreCount; 
        counter = 0;   
        simonPlay();
        
    }, 700);
    
}

// play all sounds from the beginning
function simonPlay() {  
    var timeout = 500, timeoutID, timeoutID2, int = simonArr[counter]; 
    disableClick();   
    setTimeout(function() {               
       /* timeoutID2 = setTimeout(function() {
            message = document.getElementById("message");
            message.classList.remove("active");                 
        }, 500); */
        petalArray[int].simonPlayLight();
        //petalArray[int].simonStopLight();
       // counter === 0 ? timeout = 1000 : timeout = 500;
        if (++counter < simonArr.length) {            
            timeoutID = setTimeout(simonPlay, timeout);
           // clearInterval(timeoutID);
        }       
        clickCount = 0;
         if (counter === simonArr.length) {
        enableClick(); 
    }
    }, timeout); 

   
       
    
}

init();

