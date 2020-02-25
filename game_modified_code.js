var i;
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPatern = [];
var randomChosenColor;
var firstTime = false;
var level;

// event to listen to key press to start game or start game over
$(document).on("keypress", function() {
  // check if key pressed once
  if (!firstTime) {
    //function to start game values over
    startOver();
    //function to add game sequence colors
    addGameSequence();
    //key pressed
    firstTime = true;
  }
});

//event to listen to button clicked
$(document).on("click", ".btn", function() {
  //function to add clicked button id to user clicked pattern array
  handeler(this.id);
  //function to play clicked button sound
  playSound(this.id);
  //function to animate clicked button
  animatePress($(this));
  //function to compare between clicked buttons and game patterns sequence
  checkAnswer(userClickedPatern.length);
});

//function to start game values over
function startOver() {
  //reset intial values
  level = 0;
  gamePattern = [];
  userClickedPatern = [];
}
//function to play clicked button sound
function playSound(sound) {
  //select sound and play it
  sound = new Audio("sounds\\" + sound + ".mp3");
  sound.play();
}
//function to add game sequence colors
function addGameSequence() {
  //generate random number
  randomChosenColor = Math.floor(Math.random() * 4);
  //add random color to gamePattern array
  gamePattern.push(buttonColors[randomChosenColor]);
  //animate this random color button
  $("#" + buttonColors[randomChosenColor]).fadeOut(100).fadeIn(100);
  //play it's sound
  playSound(buttonColors[randomChosenColor]);
  //update level display
  $("#level-title").text("Level " + level);
  level++;
}

//function to add clicked button id to user clicked pattern array
function handeler(userChosenColor) {
  userClickedPatern.push(userChosenColor);
}

//function to animate clicked button
function animatePress(currentColor) {
  $(currentColor).addClass("pressed").delay(100).queue(function() {
    $(this).removeClass("pressed").dequeue();
  });
}

//function to compare between clicked buttons and game patterns sequence
function checkAnswer(currentLevel) {
  //check if clicked button index is the same of generated sequance
  if (userClickedPatern[currentLevel - 1] === gamePattern[currentLevel - 1]) {
    //check if two lists have the length
    if (userClickedPatern.length === gamePattern.length) {
      //delay this step
      setTimeout(function() {
        //add new random color
        addGameSequence();
        //reset user clicked patern to next level
        userClickedPatern = [];
      }, 1000);
    }

  } else {
    //update level display
    $("#level-title").text("Game Over, Press Any Key to Restart");
    //reset keypress value to start game over
    firstTime = false;
    //play wrong sound
    playSound("wrong");
    //flash red light
    $("body").addClass("game-over").delay(200).queue(function() {
      $(this).removeClass("game-over").dequeue();
    });
  }
}
