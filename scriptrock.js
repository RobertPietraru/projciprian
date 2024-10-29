var options = ['rock', 'paper', 'scissors'];
var playerOption;
var display = document.getElementById("Display");
var computerchose = document.getElementById("ComputerDisplay")
var results = document.getElementById("results")
document.getElementById("rockoption").disabled = true;
document.getElementById("paperoption").disabled = true;
document.getElementById("scissorsoption").disabled = true;
var rounds = 0;
var playerwon = 0;
var computerwon = 0;
var gamestart = false;
function randomNumber() {
    var number = Math.floor(Math.random() * options.length);
    return number;
}

function StartGame(){
    gamestart = true;
    document.getElementById("start").disabled = true;
    document.getElementById("rockoption").disabled = false;
    document.getElementById("paperoption").disabled = false;
    document.getElementById("scissorsoption").disabled = false;
    document.getElementById("YouWon").value=0;
    document.getElementById("ComputerWon").value=0;
    rounds = 0;
    playerwon = 0;
    computerwon = 0;
  
}

function rockpaperscissors() {
if(gamestart){
    display.value = "";
    var chosenOption = options[randomNumber()];
    computerchose.value = chosenOption;
    display.value = playerOption;
    
    if (chosenOption === playerOption) {
        results.value = "Draw! Play again!";
    } else if (
        (playerOption === 'rock' && chosenOption === 'scissors') ||
        (playerOption === 'paper' && chosenOption === 'rock') ||
        (playerOption === 'scissors' && chosenOption === 'paper')
    ) {
       results.value =  "You win! " + playerOption + " beats " + chosenOption;
       playerwon++;
       document.getElementById("YouWon").value=playerwon;
    } else {
        results.value = "You lose! " + chosenOption + " beats " + playerOption;
        computerwon++;
        document.getElementById("ComputerWon").value=computerwon;
    }

    rounds++;
    if(rounds == 10){
        gamestart=false;
        document.getElementById("start").disabled = false;
        if(computerwon > playerwon){
            results.value = "Computer won!";
        }
        else if(computerwon < playerwon){
            results.value = "You won!";
        }
        else results.value = "draw";

   document.getElementById("rockoption").disabled = true;
    document.getElementById("paperoption").disabled = true;
    document.getElementById("scissorsoption").disabled = true;
    }
}
}

function rock() {
    playerOption = 'rock';
    rockpaperscissors();
}

function paper() {
    playerOption = 'paper';
    rockpaperscissors();
}

function scissors() {
    playerOption = 'scissors';
    rockpaperscissors();
}

