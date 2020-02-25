var i;
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomChosenColor = nextSequence();
var userClickedPatern = [];
gamePattern.push(buttonColors[randomChosenColor]);


//event listen to key A to start game
$(document).on("keypress", function(e) {
    startGame();
});




$(document).on("click", ".btn", function() {

  handeler(this.id);

  $(this).fadeOut(100, function() {
    $(this).addClass("pressed").delay(100);
  }).fadeIn(100, function() {
    playSound(this.id);
    $(this).removeClass("pressed");
  });

  for (i = 0; i < userClickedPatern.length; i++) {

    if (userClickedPatern[i] !== gamePattern[i]) {
      console.log(userClickedPatern, gamePattern);
      i = 0;
      userClickedPatern = [];
      $("body").addClass("game-over");
      playSound("wrong");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      break;
    }
  }

  if (i === gamePattern.length) {
    setTimeout(function() {

      levelUp();
      i = 0;
      userClickedPatern = [];

    }, 800);
  }
});

function playSound(sound) {
 sound = new Audio("sounds\\" + sound + ".mp3");
  sound.play();
}



function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  return randomNumber;
}

function startGame() {
  gamePattern=[];
  $("body").removeClass("game-over");
  levelUp();
  // select the button that generated aoutamtic
  // flash this button
  $("#" + buttonColors[randomChosenColor]).fadeOut(100).fadeIn(100);
  playSound(buttonColors[randomChosenColor]);
}


function handeler(userChosenColor) {
  userClickedPatern.push(userChosenColor);
}

function levelUp() {

  randomChosenColor = nextSequence();
  gamePattern.push(buttonColors[randomChosenColor]);

  $("#level-title").text("Level " + gamePattern.length);
  // select the button that generated aoutamtic
  // flash this button
  $("#" + buttonColors[randomChosenColor]).fadeOut(100).fadeIn(100);
  playSound(buttonColors[randomChosenColor]);
}
