var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;

$(document).on("keydown", function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$("#start-btn").on("click", function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        $("#level-title-2").text("Level " + level);
        nextSequence();
        started = true;
        $("#start-btn").addClass("visibility-hidden");
    }
});


$(".btn").on("click", function () {
    if (started) {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    }
    else {
        $("#key-text").fadeOut(100).fadeIn(100);
        $("#start-btn").fadeOut(100).fadeIn(100);
        playSound("wrong");
    }
});



function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    $("#level-title-2").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(function(){
    playSound(gamePattern[i]);
    $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
}, i * 750);
}
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        // console.log("wrong");
        if (started) {
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            $("#level-title").html("Game Over, Press Any <span id='key-text'>Key</span> to Restart");
            $("#level-title-2").html("Game Over, Press to Restart");
            $("#start-btn").removeClass("visibility-hidden");
            $("#start-btn").text("Restart");
            startOver();
        }
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
