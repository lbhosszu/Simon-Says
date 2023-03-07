

let order = [];
let playerOrder = [];
let playerTurn = false;
let flashCount;
let FailFlashCount;
let turn = 1;
let correct  = true;
let intervalId;
let speed;
let currentScore = 0;
let highScore = 0;
let intervalFail;
let signalTimeOut;

const green = document.querySelector("#green");
const red = document.querySelector("#red");
const yellow = document.querySelector("#yellow");
const blue = document.querySelector("#blue");
const start = document.querySelector("#start");

//clicking the button will start the game
start.addEventListener('click', (event) =>{
  document.getElementById("text").innerHTML = "";
  document.getElementById("indicator").style.background = "#64C51B"; // setting thr indicator to green
  clearColour();
  setTimeout(() => { //add 2 second delay as there will be a 1 second delay before the first flash making it 3 seconds
    play();
  }, 2000);
});

//creates a random number between 1 and 4 and pushes into the order array
function random(){
  let random = Math.floor(Math.random() * 4) + 1;
  order.push(random);
}

//sets/resets the game
function play(){
  order = [];
  playerOrder = [];
  correct = true;
  speed = 1000;
  flashCount = 0;
  FailFlashCount = 0;
  turn = 1;
  intervalId = 0;
  playerTurn = false;
  intervalId = setInterval(Sequence,speed);
}

//creating the pattern of the game
function Sequence() {
  random(); //adds a new colour to the pattern
  if (flashCount == turn) { // checks if its the players turn 
    clearInterval(intervalId);
    playerTurn = true; //allowing the user to press on a circle
    clearColour();
    TimeUp(); // calls the 5 second time up function after the sequence is done
  }
  if (!playerTurn) { // if its not the plaeys turn keeps playing the sequence
    clearColour();
    setTimeout(() => {
      Flash();
      flashCount++;
    }, 500);
  }
}

// based on the number in the array it will change colour(flashes)
function Flash(){
  if(order[flashCount] == 1){
    green.style.backgroundColor = "#bdff8b";
  }
  else if(order[flashCount] == 2){
    red.style.backgroundColor = "#eb6565";
  }
  else if(order[flashCount] == 3){
    yellow.style.backgroundColor = "#ffde90";
  }
  else if(order[flashCount] == 4){
    blue.style.backgroundColor = "#b3d1ff";
  }
}

 // remove the colour change and puts all four circles back to the original colour
function clearColour(){
  green.style.backgroundColor = "#64C51B";
  red.style.backgroundColor = "#E50100";
  yellow.style.backgroundColor = "#FEC63F";
  blue.style.backgroundColor = "#2D75DE";
}

//green circle input
green.addEventListener('click',(event) =>{
  if(playerTurn){
    playerOrder.push(1); //pushes 1 (green) into the playerOrder array
    check();
  }
});

//red circle input
red.addEventListener('click',(event) =>{
  if(playerTurn){
    playerOrder.push(2); //pushes 2 (red) into the playerOrder array
    check();
  }
});

//yellow circle input
yellow.addEventListener('click',(event) =>{
  if(playerTurn){
    playerOrder.push(3); //pushes 3 (yellow) into the playerOrder array
    check();
  }
});

//blue circle input
blue.addEventListener('click',(event) =>{
  if(playerTurn){
    playerOrder.push(4); //pushes 4 (blue) into the playerOrder array
    check();
  }
});

//checks if the players sequence matches with the randomly generated sequence
function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]){ //sets the correct boolean to false if they dont match
    correct = false;
  }

  if (turn == playerOrder.length && correct) { //if they match and its the right round
    clearTimeout(signalTimeOut);
    Score(); //increases the current score
    speedUp(); // calls the seepd up function
    turn++;
    playerOrder = []; // resets the playes sequnce every round
    playerTurn = false; //disables the circles so the player add colous to the sequence when its not the players turn
    flashCount = 0;
    intervalId = setInterval(Sequence, speed);
  }

  if (correct == false) { //if the arrays dont match
    document.getElementById("text").innerHTML = "Game Over!";
    Fail(); //calls the fail function
  }

}

function Fail(){
  playerTurn = false;
  document.getElementById("indicator").style.background = "red"; //setting the indicator circle back to red
  endScore(); //calls the endScore function which is the high score
  clearTimeout(signalTimeOut);
  FailFlash(); //makes all the circles flash red
  intervalFail = setInterval(FailFlash,1000); //makes all the circles flash 4 more times
}

//makes all the circles flash red
function FailFlash(){
  if(FailFlashCount == 4){
    clearInterval(intervalFail);

    green.style.backgroundColor = "red";
    red.style.backgroundColor = "red";
    yellow.style.backgroundColor = "red";
    blue.style.backgroundColor = "red";
  }
  else{
    green.style.backgroundColor = "red";
    red.style.backgroundColor = "red";
    yellow.style.backgroundColor = "red";
    blue.style.backgroundColor = "red";

    setTimeout(() => {
      clearColour();
    }, 500);
    FailFlashCount++;
  }
}

//updates the current score evry round
function Score(){
  currentScore++;
  if(currentScore<10){
    document.getElementById("currentScore").innerHTML = "0" + currentScore; //updates the score in the html
  }
  else{
    document.getElementById("currentScore").innerHTML = currentScore;
  }
}

//updates the high score
function endScore(){
  document.getElementById("currentScore").innerHTML = "00"; //resets the current score in the html

  if(currentScore > highScore){ //check if the last rounds score is higher than the high score
    highScore = currentScore;
    currentScore = 0; //resets current score back to 0
  }

  if(highScore<10){
    document.getElementById("highScore").innerHTML = "0" + highScore; // updates the high score in the html
  }
  else{
    document.getElementById("highScore").innerHTML = highScore;
  }
}

//sppeds up the game
function speedUp(){
  if(currentScore == 5){
    speed = 800;
  }
  if(currentScore == 9){
    speed = 600;
  }
  if(currentScore == 13){
    speed == 400;
  }
}

//starts a timer after every sequence and ends the game if the player fails to repeat the sequence in 5 seconds
function TimeUp(){
  signalTimeOut = setTimeout(() => {
    document.getElementById("text").innerHTML = "Game Over! You run out of time!";
    Fail();
  }, 5000);
}