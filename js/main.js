function init() {  
    var simon = new SimonGame(); 
    listener("add", "id", "onOff", "click", simon.onAndOff); // uncomment this if on-off switch should function
    //listener("add", "id", "start", "click", simon.start); // comment this out if on-off switch should function
    //listener("add", "id", "reset", "click", simon.reset); // comment this out if on-off switch should function
    //listener("add", "id", "strict", "click", simon.strict); // comment this out if on-off switch should function
}
 

var Petal = function(audio, id, defaultStyle, lightStyle) {   
    var self = this,
    lightStyle = lightStyle;

    this.audio = audio;
    this.id = id;
    this.defaultStyle = defaultStyle;
    this.simonPlayLight = function() {
          setTimeout(function(){
             self.audio.play();
                document.getElementById(id).style = lightStyle;    
                setTimeout(function() {
                var id = self.id, defaultStyle = self.defaultStyle;
                document.getElementById(id).style = defaultStyle;
                }, 500); 
          }, 150);
    } 
}

var SimonGame = function() {
    const greenAudio = document.createElement('audio'),
    redAudio = document.createElement('audio'),
    yellowAudio = document.createElement('audio'),
    blueAudio = document.createElement('audio');
  
    greenAudio.setAttribute('src','https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    redAudio.setAttribute('src','https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    yellowAudio.setAttribute('src','https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    blueAudio.setAttribute('src','https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

    const str1 =  "background-image: radial-gradient(circle at ",
    str2 = ", rgba(255, 255, 255, 0.7), ",
    str3 = " 33%);",
    greenActivestr = str1 + "19% 19%" + str2 + "#3ad146" + str3,
    greenDefaultstr = str1 + "19% 19%" + str2 + "#22992c" + str3,

    redActivestr = str1 + "27% 27%" + str2 + "#f62f18" + str3,
    redDefaultstr = str1 + "27% 27%" + str2 + "#c41a06" + str3,

    blueActivestr = str1 + "19% 19%" + str2 + "#00a7ee" + str3,
    blueDefaultstr = str1 + "19% 19%" + str2 + "#0574a3" + str3,

    yellowActivestr = str1 + "27% 27%" + str2 + "#fee73b" + str3,
    yellowDefaultstr = str1 + "27% 27%" + str2 + "#c2ab01" + str3;

    const greenPetal = new Petal(greenAudio, "green", greenDefaultstr, greenActivestr),
    redPetal = new Petal(redAudio, "red", redDefaultstr, redActivestr),
    bluePetal = new Petal(blueAudio, "blue", blueDefaultstr, blueActivestr),
    yellowPetal = new Petal(yellowAudio, "yellow", yellowDefaultstr, yellowActivestr);

    petalArray = [greenPetal, redPetal, bluePetal, yellowPetal];

    var self = this,
    
    isFinished = false;

    onAndOff = function(e) {
        if ( e.target.classList.contains("onOff")) {
            //  alert("off");
            //dectivate start button
            e.target.classList.remove("onOff"); 
            document.getElementById("start").style = "background:rgba(255,255,255, 0.5)";
            document.getElementById("step").textContent = "";
            self.simonArr.length = 0;
            self.counter = 0;
            self.clickCount = 0;
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
    },    
    start = function(e) {    
        document.getElementById("strict").style = "background:rgba(255,255,255, 0.5)";
        // document.getElementById("step").textContent = "--";
        beginGame();
    },
    strict = function(e) {
        e.target.style = "background:#42A5F5";
        
    // document.getElementById("start").style = "background:rgba(255,255,255, 0.5)";

    },
    reset = function(e) {   
        self.simonArr.length = 0;  
        self.counter = 0;  
        self.clickCount = 0;  
        self.stepCount = 0;  
        self.playerStepCount = 0;
        start();
    },
    disableClick = function() {
        clickable = false;
        document.getElementById("green").classList.remove("hasActive");
        document.getElementById("red").classList.remove("hasActive");
        document.getElementById("blue").classList.remove("hasActive");
        document.getElementById("yellow").classList.remove("hasActive");
        listener("remove", "id", "green", "click", playOnClick);    
        listener("remove", "id", "red", "click", playOnClick);
        listener("remove", "id", "blue", "click", playOnClick);
        listener("remove", "id", "yellow", "click", playOnClick);
    },
    enableClick = function() {
        clickable = true;
        document.getElementById("green").classList.add("hasActive");
        document.getElementById("red").classList.add("hasActive");
        document.getElementById("blue").classList.add("hasActive");
        document.getElementById("yellow").classList.add("hasActive");
        listener("add", "id", "green", "click", playOnClick);    
        listener("add", "id", "red", "click", playOnClick);
        listener("add", "id", "blue", "click", playOnClick);
        listener("add", "id", "yellow", "click", playOnClick);
    },
    playOnClick = function(e) {
        var id = e.target.id, int, timeout, message = document.getElementById("message");      
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
        self.petalArray[int].simonPlayLight();   
 

        if (self.clickCount < self.simonArr.length) {  
            if (int === self.simonArr[self.clickCount]) {
                self.clickCount++;  
                if (self.clickCount === self.simonArr.length) {
                    self.playerStepCount++;
                     setTimeout(function() {
                        timeout = checkEndGame();  
                        setTimeout(function() {
                            addSound();
                        }, timeout);           
                    }, 1300);       
                   /* checkEndGame();  
                    setTimeout(function() {
                        addSound();
                    }, 1500);    */                 
                }       
            }
            else {
                message.classList.add("active");
                message.textContent = "You have made a mistake! Listen and try again.";
                setTimeout(function() {
                    message = document.getElementById("message");
                    message.classList.remove("active");                 
                }, 1500);
                self.counter = 0;
                self.clickCount = 0;
                setTimeout(function() {
                    simonPlay(); 
                }, 1500);  
            }   
        }
        self.proceed = true;   // all buttons have been clicked correctly   
    },
    beginGame = function() {
        self.proceed = true;
        self.simonArr.length = 0;  
        self.counter = 0;  
        self.clickCount = 0;  
        self.stepCount = 0;  
        self.playerStepCount = 0;
        document.getElementById("step").textContent = "--";
        addSound();
    },
   
    // generate a new sound and add it to the array, then play all of them
    addSound = function() {
        if (self.proceed) {
            var step = document.getElementById("step");
            disableClick();   
            setTimeout(function() {          
                var int = Math.floor(Math.random() * 4); 
                self.simonArr.push(int);
                self.stepCount++;  
                if (self.stepCount < 10) { step.textContent = "0" + self.stepCount; }
                else { step.textContent = self.stepCount; }
                //self.stepCount < 10 ? step.textContent = "0" + self.stepCount : step.textContent = self.stepCount; 
                self.counter = 0;   
                simonPlay();        
            }, 700); 
        }   
    },
    // play all sounds from the beginning
    simonPlay = function() {  
        var int = self.simonArr[self.counter]; 
        disableClick();   
        setTimeout(function() {           
            self.petalArray[int].simonPlayLight();
          
            if (++self.counter < self.simonArr.length) {            
                setTimeout(simonPlay, 500);
            }       
            self.clickCount = 0;
            if (self.counter === self.simonArr.length) {
                self.proceed = false;
                enableClick(); 
            }
        }, 500);         
    },
     checkEndGame = function() {
        var timout = 300, message = document.getElementById("message");
        if (self.playerStepCount === 20) {
            timeout = 1300;
            message.classList.add("active");
            message.textContent = "You have won the game! Now a new game starts.";
            
            setTimeout(function() {
                message = document.getElementById("message");
                message.classList.remove("active");            
            }, 1500);
             
            document.getElementById("step").textContent = "--";
            beginGame(); 
            return timeout;   
        }
    };

    this.proceed = true; 
    this.counter = 0;  // corresponds to position in simonArr
    this.clickCount = 0;  // counter of user's clicks within a step
    this.stepCount = 0;  // counter of game's steps, corresponds to simonArr's length
    this.playerStepCount = 0;  // counter of player's succesfully completed steps
    this.simonArr = [];    // store randomly generated sound/light
    this.petalArray = petalArray;

    this.onAndOff = onAndOff;
    this.reset = reset;
    this.start = start;
    this.strict = strict;
    this.addSound = addSound;
    this.simonPlay = simonPlay;
    this.playOnClick = playOnClick;    
}

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

var simon = new SimonGame(); 
    listener("add", "id", "onOff", "click", simon.onAndOff); 

//init();

