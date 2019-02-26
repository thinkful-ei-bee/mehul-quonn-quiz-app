"use strict";
let questionNumber = 0;

//called when the "start quiz" button is clicked on the first screen
function startQuiz() {
  $("#startBtn").on("click", function() {
    $(this).remove();
    $("#questionBox").css("display", "block");
  });
}

//generates the first question view
function renderView() {
  $("#questionBox").html(generateQuestion());
  generateQuestion();
}

function generateQuestion() {
  if (questionNumber < STORE.length) {
    return `<div class="question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${
      STORE[questionNumber].answers[0]
    }" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${
      STORE[questionNumber].answers[1]
    }" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${
      STORE[questionNumber].answers[2]
    }" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${
      STORE[questionNumber].answers[3]
    }" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
  } else {
    renderResults();
    restartQuiz();
    $(".questionNumber").text(10);
  }
}

function handleClickSubmitBtn() {
  $("form").on("click", "button", function(event) {
    event.preventDefault();
    questionNumber++;
    console.log(STORE.length, questionNumber);
    renderView();
  });
}

function renderResults() {
  console.log("render results");
}
//Calls all other functions
function handleQuiz() {
  renderView();
  startQuiz();
  handleClickSubmitBtn();
}

function restartQuiz() {
  console.log("restart quiz");
}

$(handleQuiz());
