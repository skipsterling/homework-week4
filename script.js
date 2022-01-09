// Creating variables for all my html elements.
var containerArea = document.getElementById("container");
var page1 = document.getElementById("page-1");
var startbutton = document.getElementById("start");
var highScores = document.getElementById("highscores");
var quizArea1 = document.getElementById("quiz");
var timeRemaining = document.getElementById("TR");
var quizQuestions = document.getElementById("qq");
var button1 = document.getElementById("1");
var button2 = document.getElementById("2");
var button3 = document.getElementById("3");
var button4 = document.getElementById("4");
var result = document.getElementById("results");
var complete = document.getElementById("Complete");
var scoreCard = document.getElementById("score-card");
var initials = document.getElementById("init");
var hsContainer = document.getElementById("hs-container");
var hsList = document.getElementById("hs-list");
var hsHead = document.getElementById("hs-head");
var hsInit = document.getElementById("hs-init")
var hsCard = document.getElementById("hs-card");
var finishButton = document.getElementById("FinishButton");
var keepPlaying = document.getElementById("KeepPlaying");
var clearScores = document.getElementById("clear-scores");
var addScoreButton = document.getElementById("add-score");

// Quiz questions section.
var questionTime = [{
  question: "What does the p tag stand for in html?",
  option1: "Part way there",
  option2: "Pairs",
  option3: "paragraph",
  option4: "possible",
  correctanswer: "3"
},
{
  question: "If I wanted to add a line break in my text which tag would I use in html?",
  option1: "br",
  option2: "lb",
  option3: "line",
  option4: "break",
  correctanswer: "1"
},
{
  question: "If you want to run the same code over and over again, each time with a different value. The quickest way to do this is in javascript with a ?",
  option1: "booleans",
  option2: "loop",
  option3: "comparisons",
  option4: "all of the above",
  correctanswer: "2"
},
{
  question: "In javascript which of the following could be used as conditional statements?",
  option1: "if",
  option2: "if else",
  option3: "switch",
  option4: "all of the above",
  correctanswer: "4"
},
{
  question: "In javascript what does Math.random() do?",
  option1: "creates a calculator for mice",
  option2: "turns letters into numbers",
  option3: "makes a calculator emoji",
  option4: "returns a random number",
  correctanswer: "4"
},
];

// Global variables. 
var lastQIndicator = questionTime.length;
var presentQIndicator = 0;
var timeLeft = 100;
var quizScore = 100;
var timeInterim;
var sCard = 0;
var correct;

// Creating a function thats going to move through the quiz questions.
function generateQuestionTime() {
  complete.style.display = "none";
  if (presentQIndicator === lastQIndicator) {
    return showScore(timeLeft + quizScore);
  }
  var presentQuestion = questionTime[presentQIndicator];
  quizQuestions.innerHTML = "<p>" + presentQuestion.question + "</p>"
  button1.innerHTML = presentQuestion.option1;
  button2.innerHTML = presentQuestion.option2;
  button3.innerHTML = presentQuestion.option3;
  button4.innerHTML = presentQuestion.option4;
};

// Creating a function thats going to remove the start button when clicked, starting the timer and shows the first quiz question.
function quizStart() {
  complete.style.display = "none";
  page1.style.display = "none";
  generateQuestionTime();

  // This section will create our countdown timer
  timeInterim = setInterval(function () {
    timeLeft--;
    timeRemaining.textContent = "Time Remaining: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timeInterim);
      showScore();
    }
  }, 1000);
  quizArea1.style.display = "block";
}

// This function will appear if you complete the quiz or time has run out
function showScore() {
  quizArea1.style.display = "none"
  complete.style.display = "flex";
  clearInterval(timeInterim);
  initials.value = "";
  scoreCard.innerHTML = "You scored " + timeLeft + " out of " + quizScore;
}

// on click of add score button, this will run the highscore function this will then save and stringify the highscores that are already saved in the local storage.
// It will also push the new consumers name and score into the array we are saving into the local storage. Then the function will run to show you the highscores.
addScoreButton.addEventListener("click", function () {

  if (initials.value === "") {
    alert("You can't leave this section blank!");
    return false;
  } else {
    var savedHighscores = JSON.parse(localStorage.getItem("hscore")) || [];
    var currentPlayer = initials.value.trim();
    var playerHS = {
      name: currentPlayer,
      score: timeLeft
    };

    complete.style.display = "none";
    hsContainer.style.display = "flex";
    hsList.style.display = "block";
    finishButton.style.display = "flex";

    savedHighscores.push(playerHS);
    localStorage.setItem("hscore", JSON.stringify(savedHighscores));
    generateHighscores();

  }
});

// This function will clear the list of high scores and then generates a new high score list from the local storage!
function generateHighscores() {
  hsInit.innerHTML = "";
  hsCard.innerHTML = "";
  var hs = JSON.parse(localStorage.getItem("hscore")) || [];
  for (i = 0; i < hs.length; i++) {
    var newName = document.createElement("li");
    var newScore = document.createElement("li");
    newName.textContent = hs[i].name;
    newScore.textContent = hs[i].score;
    hsInit.appendChild(newName);
    hsCard.appendChild(newScore);
  }
}

// This page will display the highscores.
function showHighscore() {
  page1.style.display = "none"
  complete.style.display = "none";
  hsContainer.style.display = "flex";
  hsList.style.display = "block";
  finishButton.style.display = "flex";

  generateHighscores();
}

