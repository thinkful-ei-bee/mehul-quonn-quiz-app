"use strict";
/* global $ */

let questionNumber;

// to be updated every time question number is incremented

let currentState = {
  questions: {
    currqNum: 0,
    currQ: STORE[0].question,
    currAnswers: STORE[0].answers,
    currCorrectAnswer: STORE[0].correctAnswer,
    currIcon: STORE[0].icon,
    currAlt: STORE[0].alt,
    currCorrect: 0
  },
  startBtnVisible: true,
  submitClicked: false,
  userAnswerCorrect: false,
  nextBtnClicked: false
};

function updateCurrentState(questionNumber) {
  const questions = currentState.questions;
  questions.currqNum = questionNumber;
  questions.currQ = STORE[questionNumber].question;
  questions.currAnswers = STORE[questionNumber].answers;
  questions.currCorrectAnswer = STORE[questionNumber].correctAnswer;
  questions.currIcon = STORE[questionNumber].icon;
  questions.currAlt = STORE[questionNumber].alt;
}

function handleStartBtnClicked() {
  $("#startBtn").on("click", function() {
    currentState.startBtnVisible = false;
    console.log("here");
    renderView();
  });
}

//called when the "start quiz" button is clicked on the first screen
function startQuiz() {
  $("#startBtn").remove();
  $("#questionBox").css("display", "block");
  questionNumber = 0;
  $(".questionNumber").text(1);
  $(".score").text(0);
}

//generates the first question view
function renderView() {
  if (!currentState.startBtnVisible && questionNumber === undefined) {
    console.log(currentState.startBtnVisible);
    startQuiz();
    $("#questionBox").html(generateQuestion());
  } else if (currentState.submitClicked) {
    console.log("from render else");
    displayQuestionResult(currentState.userAnswerCorrect);
  } else if (currentState.nextBtnClicked && questionNumber < STORE.length) {
    console.log("right before results");
    $("#questionBox").html(generateQuestion());
  } else if (currentState.nextBtnClicked && questionNumber >= STORE.length) {
    console.log("before results");
    Results();
  }
}

function generateQuestion() {
  if (questionNumber < STORE.length) {
    let questions = currentState.questions;
    return `<div class="question-${questionNumber}">
    <h2 class="trivia-question">${questions.currQ}</h2>
    <form id="questionForm">
    <fieldset>
    <div class='answerBox'>
    <label class="answerOption">
    <input type="radio" value="${
      questions.currAnswers[0]
    }" name="answer" required>
    <span>${questions.currAnswers[0]}</span> 
    </label></div>
    <div class='answerBox'>
    <label class="answerOption">
    <input type="radio" value="${
      questions.currAnswers[1]
    }" name="answer" required>
    <span>${questions.currAnswers[1]}</span>
    </label></div>
    <div class='answerBox'>
    <label class="answerOption">
    <input type="radio" value="${
      questions.currAnswers[2]
    }" name="answer" required>
    <span>${questions.currAnswers[2]}</span>
    </label></div>
    <div class='answerBox'>
    <label class="answerOption">
    <input type="radio" value="${
      questions.currAnswers[3]
    }" name="answer" required>
    <span>${questions.currAnswers[3]}</span>
    </label></div>
    <input id="questionSubmit" type="submit" class="submitButton" value="SUBMIT">
    </fieldset>
    </form>
    </div>`;
  } else {
    console.log("right beore reuslt");
    Results();
  }
}

function handleClickSubmitBtn() {
  $("#questionBox").on("click", "input:submit", function(event) {
    event.preventDefault();
    checkAnswer();
  });
}

//Need a check Answer function
function checkAnswer() {
  currentState.submitClicked = true;
  console.log("from check answer");
  //$(".answerOption").on("click", function() {
  // $this.find("input:radio").prop("checked", true);
  //console.log("clicke");
  //});
  let selectedAnswer = $('input[type = "radio"]:checked').val();
  let width = questionNumber + 1;
  $(".progress-bar").css("width", `${width * 20}%`);
  if (selectedAnswer === currentState.questions.currCorrectAnswer) {
    currentState.questions.currCorrect++;
    currentState.userAnswerCorrect = true;
    $(".progress-overlay").css(
      "width",
      `${currentState.questions.currCorrect * 20}%`
    );
    $(".score").text(currentState.questions.currCorrect);
  }
  renderView();
  currentState.userAnswerCorrect = false;
  currentState.submitClicked = false;
}

function displayQuestionResult(result) {
  if (result) {
    $(`.question-${questionNumber}`).css("display", "none");
    $("#questionBox").html(`<img class= "icon" src=${
      currentState.questions.currIcon
    }>
  <p> "Correct!" </p> 
  <button type="submit" class="nextButton">Next</button>`);
  } else {
    $(`.question-${questionNumber}`).css("display", "none");
    $("#questionBox").html(`<img class= "icon" src=${
      currentState.questions.currIcon
    }>
  <p> "Incorrect. The correct answer is ${
    currentState.questions.currCorrectAnswer
  }" </p> 
  <button type="submit" class="nextButton">Next</button>`);
  }
}

function handleNextButton() {
  $("#questionBox").on("click", ".nextButton", function(event) {
    console.log("next button clicked");
    event.preventDefault();
    questionNumber++;
    if (questionNumber < STORE.length) {
      updateCurrentState(questionNumber);
      currentState.nextBtnClicked = true;
      renderView();
      currentState.nextBtnClicked = false;
      $(".questionNumber").text(questionNumber + 1);
    } else {
      renderView();
    }
  });
}

function Results() {
  $("#questionBox").html(`
  <h1>Your Stats!</h1>
  <hr>
  <h1>Questions Attempted: <span class="text-orange">${questionNumber}</span></h1>
  <h1>Correct Answers: <span class="text-orange">${
    currentState.questions.currCorrect
  }</span></h1>
  <h1>Percentage: <span class="text-orange">${currentState.questions
    .currCorrect * 20}%</span></h3>
  <h1>Missed: <span class="text-orange">${5 -
    currentState.questions.currCorrect}</span></h1>
  <div class="progress-bar></div>
  <p> "You had ${
    currentState.questions.currCorrect
  } out of ${questionNumber} correct" </p> 
  <button id="resetBtn" type="submit" class="resetQuizButton">Reset Quiz</button>`);
}

//Calls all other functions
function handleQuiz() {
  handleClickSubmitBtn();
  handleStartBtnClicked();
  handleNextButton();
  restartQuiz();
}

function restartQuiz() {
  $("#questionBox").on("click", "#resetButton", function(event) {
    questionNumber = 0;
    $(".questionNumber").text(questionNumber + 1);
    $(".score").text(0);
    $(".progress-bar,.progress-overlay").css("width", "0");
    updateCurrentState(questionNumber);
    currentState.questions.currCorrect = 0;
    renderView();
    handleClickSubmitBtn();
  });
}

$(handleQuiz());
