var startbtn = document.getElementById("first");
var stopbtn = document.getElementById("second");
var resetbtn = document.getElementById("third");
var display = document.getElementById("display");

var countdownbtn = document.getElementById("ctdbtn");
var ctdMinutes = 0;
var ctdSeconds = 0;

var ctdresume =true;

var minutes = 0;
var seconds = 0;
var count = 0;
var timer = false;

var ctdwn = false;
var count2;


function timerstart(){
    timer = true;
    stopwatch();
}

function timerstop(){
    timer = false;
    clearTimeout(mytimeout);
}

function reset(){
    minutes = 0;
    seconds = 0;
    count = 0;
    display.value = "0m:0s"
    ctdMinutes = 0;
    ctdSeconds = 0;
}

function stopwatch(){
    if (timer){
        count++;
        
        if (count == 100){
            seconds ++;
            count = 0;
        }
        if(seconds == 60){
            minutes ++;
            seconds = 0;
        }
    }



    display.value = minutes +"m"+  ":" + seconds + "s";

    mytimeout = setTimeout(stopwatch, 10);
}


function ctdstart(){
ctdMinutes = document.getElementById("ctddisplayM").value;
ctdSeconds = document.getElementById("ctddisplayS").value;
ctdwn = true;
while(ctdSeconds >=60){
    ctdSeconds -=60;
    ctdMinutes ++;
}
countdown();

}

function ctdstop(){
    ctdwn = false;
    clearTimeout(mytimeout2);
}

function resumecountdown(){

    if(!ctdwn){
        ctdwn = true;
        mytimeout2 = setTimeout(countdown , 1000);  
    }

    


}

function countdown(){

console.log(ctdMinutes);
console.log(ctdSeconds);

if(ctdwn){
    
    
    if( ctdSeconds == 0 && ctdMinutes !=0){
        ctdMinutes--;
        ctdSeconds = 59;
    }
    if(ctdSeconds >=1)
        ctdSeconds--;

    if(ctdSeconds == 0 && ctdMinutes == 0)
        clearTimeout(mytimeout2);

    
}

display.value = ctdMinutes +"m"+  ":" + ctdSeconds + "s";

mytimeout2 = setTimeout(countdown , 1000);

}

