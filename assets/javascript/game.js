// Creates an array that lists out all of the options (Rock, Paper, or Scissors).
var computerChoices = ['Mario',
'Luigi',
'Peach',
'Bowser',
'Yoshi',
'Wario',
'Game & Watch',
'Donkey Kong',
'Diddy Kong',
'Link',
'Zelda',
'Sheik',
'Ganondorf',
'Toon Link',
'Samus',
'Zero Suit Samus',
'Pit',
'Marth',
'Ike',
'King DeDeDe',
'Meta Knight',
'Fox',
'Falco',
'Pikachu',
'Lucario',
'Jigglypuff',
'Charizard',
'ROB',
'Ness',
'Captain Falcon',
'Olimar',
'Dr. Mario',
'Sonic',
'Rosalina',
'Bowser Jr.',
'Palutena',
'Robin',
'Little Mac',
'Greninja',
'Duck Hunt Dog',
'Villager',
'Wii Fit Trainer',
'Dark Pit',
'Lucina',
'Shulk',
'Mega Man',
'Pac-Man',
'Mii',
'Mewtwo',
'Lucas',
'Roy',
'Ryu',
'Cloud',
'Corrin',
'Bayonetta'];
var imgCaller =[];
var win = 0;
var loss = 0;
var guessCount=10;
var guesses = '';
var foundCount = 0;
var guessesLeft = document.getElementById('guessesLeft');
guessesLeft.textContent = guessCount;
var userG = document.getElementById('userG');
var randIndex, computerGuess, lengthAdjuster;

//copy array and strip spaces for grabbing images
for (m=0;m<computerChoices.length;m++) {
    imgCaller.push(computerChoices[m].replace(/\s/g,''));
    // imgCaller += imgName;
}
//console.log(imgCaller);

function initialize() {
    randIndex = Math.floor(Math.random() * computerChoices.length);
    computerGuess = computerChoices[randIndex];
    var currWordDiv = document.getElementById("currWord");
    lengthAdjuster=0;
    
    while(currWordDiv.firstChild){
        currWordDiv.removeChild(currWordDiv.firstChild);
    }
    for(var i=0;i<computerGuess.length;i++) {
    //document.getElementById('currWord').innerHTML+='-'
    //var letterBtn=
        var x = document.createElement("SPAN");
        if (("a" <= computerGuess[i] && computerGuess[i] <= "z")||(("A" <= computerGuess[i] && computerGuess[i] <= "Z"))) {
            x.setAttribute('class','letterSpan'+computerGuess[i],'data-letter', computerGuess[i]);
            var t = document.createTextNode(" _ ");
            x.appendChild(t);
        }
        else {
            var t = document.createTextNode('   '+computerGuess[i]+'   ');
            x.appendChild(t);
            lengthAdjuster++;
        }

        currWordDiv.appendChild(x);
    }
    //return [computerGuess, lengthAdjuster,randIndex];
}
initialize();
//var computerGuess2 = initVars[0];
//var lengthAdjuster2 = initVars[1];
//var randIndex2 = initVars[2];
console.log(computerGuess);
// This function is run whenever the user presses a key.
document.onkeyup = function(event) {

  // Determines which key was pressed.
  var userGuess = event.key;
  var upperGuess = userGuess.toUpperCase();

  // confirms the guess hasn't been made before and the user is guessing a letter
  if (("a" <= userGuess && userGuess <= "z")&&(!guesses.includes(userGuess))) {

  // Displays the keys the user has pressed.
    
    guesses+=userGuess;
    
   
    var t1 = document.createTextNode(' '+userGuess+' ');
    userG.appendChild(t1);


  // Alerts the Computer's guess.
  //document.getElementById('computerG').innerHTML = computerGuess;

    
    if (computerGuess.includes(userGuess)) {
        var x2 = document.getElementsByClassName("letterSpan"+userGuess);
        for (var j=0;j<x2.length;j++) {
            x2[j].textContent = userGuess;
            foundCount++;            
            }
            if (computerGuess.includes(upperGuess)) {
                var x3 = document.getElementsByClassName("letterSpan"+upperGuess);
                for (var k=0;k<x3.length;k++) {
                    x3[k].textContent = upperGuess;
                    foundCount++;
                }
            } 
    }
    else if (computerGuess.includes(upperGuess)) {
        var x3 = document.getElementsByClassName("letterSpan"+upperGuess);
        for (var l=0;l<x3.length;l++) {
            x3[l].textContent = upperGuess;
            foundCount++;            
        }
    }
    //only reduces guess count if letter not there
    else {
        guessCount--;
        guessesLeft.textContent = guessCount;
    }

    if (foundCount===computerGuess.length-lengthAdjuster) {
        win++;
        foundCount=0;
        document.getElementById('wins').textContent = win;
        guessCount=10;
        guessesLeft.textContent = guessCount;
        guesses='';
        userG.textContent = guesses;
        var splash = document.getElementById('splashArt');
        //remove last image
        while(splash.firstChild){
            splash.removeChild(splash.firstChild);
        }
        
        //show image of winning image

        var imWin = document.createElement("IMG");
        imWin.setAttribute("src", 'assets/images/'+imgCaller[randIndex]+'.png');
        imWin.setAttribute("width", "100px");
        imWin.setAttribute("alt", computerGuess);
        splash.appendChild(imWin);
        //announce character
        var audio = new Audio('assets/audio/'+imgCaller[randIndex]+'.wav');
        audio.play();
        initialize();
        // computerGuess2 = initVars[0];
        // lengthAdjuster2 = initVars[1];
        // randIndex2 = initVars[2];
        console.log(computerGuess);
    }
    
    if (guessCount===0) {
        loss++;
        foundCount=0;
        document.getElementById('losses').innerHTML = loss;
        guessCount=10;
        guessesLeft.textContent = guessCount;
        guesses='';
        userG.textContent = guesses;
        initialize();
        // computerGuess2 = initVars[0];
        // lengthAdjuster2 = initVars[1];
        // randIndex2 = initVars[2];
        console.log(computerGuess);
    }
  }
}