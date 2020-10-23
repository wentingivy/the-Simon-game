var buttonColor = ["green","red","yellow","blue"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// click start button to start the game
$("button").click(function(){
    if(!started){
        alert("started");
        nextSequence();
        $("h1").text("Level "+ level);
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    pressed(userChosenColor);
    checkAnswer(userClickedPattern.length-1); //check the last element in the array
});

function checkAnswer(curLevel){
    if(gamePattern[curLevel] === userClickedPattern[curLevel]){
       if( gamePattern.length === userClickedPattern.length ){
            setTimeout(function(){ nextSequence();},1000);
    } 
        
    } else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, click start button to restart");
        startOver();
    }
}

// random color picked and saved into the gamePattern
function nextSequence(){
    level++;
    $("h1").text("Level"+level);
    userClickedPattern = [];
    var randomColor = buttonColor[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);

    $("#"+randomColor).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomColor);
}


function playSound(name){
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}


function pressed(name){
    $("#"+ name).addClass("pressed");
    setTimeout(function(){
        $("#" + name).removeClass("pressed");
    },250);
}

//to start over:
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
