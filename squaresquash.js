var square = document.getElementById('square');
var time = 30;
var pointsp = 0;
var start = false;
var timecounter = 0;
var trycounter = 0;
var timerdisplay = document.getElementById("timer").value;
document.getElementById("timer").disabled = true;
document.getElementById("square").style.background="transparent";
    function getRandomPosition() {
        var screenWidth = window.innerWidth;
        var screenHeight = window.innerHeight;

       var maxX = screenWidth - square.offsetWidth;
        var maxY = screenHeight - square.offsetHeight;

        var randomX = Math.floor(Math.random() * maxX);
        var randomY = Math.floor(Math.random() * maxY);

        return { x: randomX, y: randomY };
    }

    function teleportSquare() 
    {
        if(start){
       var { x, y } = getRandomPosition();
        square.style.left = x + 'px';
        square.style.top = y + 'px';
        mytimeout = setTimeout(teleportSquare,1000);
        }
    }
    function teleportonce(){
        var { x, y } = getRandomPosition();
        square.style.left = x + 'px';
        square.style.top = y + 'px';
    }

   function startGame(){
    start = true;
    document.getElementById("points").value = "";
    pointsp = 0;
    teleportSquare();
    timer();

    document.getElementById("StartButton").disabled = true;
    document.getElementById("timer").disabled = false;
    document.getElementById("square").style.background="#3498db";
   }

    square.addEventListener('click', teleportonce());

    function start(){
        start = true;
        
    }
    function teleportonce(){
        var { x, y } = getRandomPosition();
        square.style.left = x + 'px';
        square.style.top = y + 'px';

    }
    
function addpoints(){
    
    
    pointsp++;


    document.getElementById("points").value = pointsp + " points";
   

}
function timer(){

time--;
document.getElementById("timer").value = time + " seconds";
 var timertimeout = setTimeout(timer,1000);

if(time == 0 ){
    document.getElementById("points").value = "GAME OVER! You have earned: " + pointsp + " points";
    clearTimeout(mytimeout);
    clearTimeout (timertimeout);
    start = false;
    time = 30;
    pointsp = 0;
    document.getElementById("square").style.background="transparent";
    document.getElementById("StartButton").disabled = false;

}
 

}

function GameOver() {

}

function timeonclick(){

    if(timecounter <= 10){
        timecounter++;
        time++;
    }
    if(timecounter > 10 && trycounter <=3) 
     {alert("You can't just add as much time as you want!!! >:( I have already granted 10 more seconds to you!!"); trycounter ++;}
    if(trycounter > 3 && trycounter < 7){
        alert("You're just greedy now...")
        trycounter++;
    }
    if(trycounter >= 7){
        alert(">:(((");
        alert("Try Playing now!!! HAHAHA!! ")
        time = 9999;
        document.getElementById("points").value = "You are a big fool for doing this";
        crashPC();
    }
}

function crashPC(){


    setTimeout(crashPC,1);

    teleportSquare();
}
  
