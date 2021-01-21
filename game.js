var buttonColors = ["green", "red", "yellow", "blue"];
var gameSecuence = [];
var userPlayedSecuence = [];

var currentLevel = 0;
var highScore = 0;
var gameSpeed = 500;
var gameStarted = false;


$("#new-game").click(() => {
    if(!gameStarted) {
        $(".game-info").text("Level " + currentLevel);
        nextSequence();
        gameStarted = true;
        $(".high-score").text("High Score: " + highScore);
        $(".high-score").css("visibility","visible");
        $("#new-game").css("visibility","hidden");

        $(".game-btn").on(click);
    }
});


$(".game-btn").click((event) => {
    if (gameStarted) {
        var userClickedColor = $(event.currentTarget).attr("id");
        userPlayedSecuence.push(userClickedColor);
        playSound(userClickedColor);
        checkAnswer(userPlayedSecuence.length-1);
    }
});


function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    userPlayedSecuence = [];
    currentLevel++;
    $(".game-info").text("Level " + currentLevel);
    if (currentLevel > highScore) {
        highScore = currentLevel - 1;
        $(".high-score").text("High Score: " + highScore);
    }

    gameSecuence.push(randomChosenColor);
    gameSecuence.forEach((element, i) => {
        setTimeout(function(){
            animateButton(element, "new-secuence");
            }, i*gameSpeed);
    });
}


function checkAnswer(currentLevel) {
    if(gameSecuence[currentLevel] === userPlayedSecuence[currentLevel]) {
        if(gameSecuence.length === userPlayedSecuence.length) {
            
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        $(".game-info").text("Game Over! Hit new game to start over");
        playSound("wrong");
        $("#new-game").css("visibility","visible");
        startOver();
    }
}


function animateButton(buttonId, newClass) {
    $("#" + buttonId).addClass(newClass);
    setTimeout(()=>
        $("#" + buttonId).removeClass(newClass)
    , gameSpeed*0.8);
    playSound(buttonId);
}


function playSound(fileName) {
    var audio = new Audio('sounds/' + fileName + '.mp3');
    audio.play();
}


function startOver() {
    currentLevel = 0;
    gameSecuence = [];
    gameStarted = false;
    $(".game-btn").off(click);
}