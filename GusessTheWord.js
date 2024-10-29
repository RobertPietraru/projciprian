
var words = ['apple','pear','orange','blue','green', 'house', 'computer','door'];
var display = document.getElementById("result");
var useranswer = document.getElementById("answer").value;
var correctword;
var ctdSeconds = 30;
var ctdwn = false;
var lifes = 3;
var on = false;
var times = 0;



function randomword(){

    var number = Math.floor(Math.random() * words.length);
    console.log(words[number])
    return words[number];

}




function WordChange(){
    document.getElementById("answer").value = '';
    

   ctdstart();
   document.getElementById("submitanswer").disabled = false;
    switch(correctword = randomword()){

        case 'apple':
            display.value = "It's red and it grows on trees, what is it?";
            break;
        case 'orange':
            display.value = "It's orange and it grows on trees, what is it?";
            break;
        case 'pear' :
            display.value="It's yellow, it's a fruit and grows on trees, what is it?";
            break;
        case 'blue' :
            display.value="It's the same color as the sky during the day!";
            break;
        case 'green' :
            display.value="What color is the watermelon?";
            break;
        case 'house' :
            display.value="It's something you live in.";
            break;
        case 'computer' :
            display.value="You play videogames on it with a keyboard!";
            break;
        case 'door' :
            display.value="You use it to enter a room.";
            break;
    }
}



function rightwrong(){


    if( document.getElementById("answer").value.toLowerCase().split(" ").join("") == correctword){
        //alert("correct!");
        var CorrectAudio = new Audio("correct.mp3");
        CorrectAudio.play();
        document.getElementById("answer").value = '';
        times++;
    
        WordChange();
        
    }

    else if(document.getElementById("answer").value.toLowerCase().split(" ").join("") == ''){
        alert("Please insert a word or press the start button to skip.");
    }
    else { 
    var WrongAudio = new Audio("wrong.mp3");
        WrongAudio.play();
        document.getElementById("answer").value = '';
    lifes--;
    document.getElementById("lifes").value = lifes + " lifes left";
            WordChange();
         
    }
        
    if(lifes == 0){
        
        
        display.value = "GAME OVER!" + " You guessed: " + times + " Words";
        lifes = 3;
       
        clearTimeout(mytimeout2);
        ctdwn = false;
       
        var OverAudio = new Audio("over.mp3");
        OverAudio.play();
        document.getElementById("submitanswer").disabled = true;
        
         
            
    }
    ;


}


function ctdstart(){
    if(!ctdwn){
        ctdwn = true;
        ctdSeconds = 30;
       
        countdown();
        
        WordChange();
    }
    
    
    }
    
    function countdown(){

        
        if(ctdwn){
            
           if(ctdSeconds != 0)
            ctdSeconds--;
           else{

            display.value = "GAME OVER!" + " You guessed: " + times + " Words";
            var OverAudio = new Audio("over.mp3");
             OverAudio.play();
            clearTimeout(mytimeout2);
            ctdwn = false;
            document.getElementById("submitanswer").disabled = true;
            //WordChange();
          
           }

          
     
     
        }
        document.getElementById("lifes").value = lifes + " lifes left";
        document.getElementById("timer").value = ctdSeconds + " seconds left";
        mytimeout2 = setTimeout(countdown , 1000);
        
        }

        function lettercount(){

          var letter =  correctword.length;
            document.getElementById("letters").value = letter + " letters";


            }



        
    
        
    
    
    


