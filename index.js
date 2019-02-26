'use strict';
/* global $ */

let questionNumber = 0;


// to be updated every time question number is incremented

let currentState= {
  currqNum: questionNumber,
  currQ: STORE[questionNumber].question,
  currAnswers: STORE[questionNumber].answers,
  currCorrectAnswer: STORE[questionNumber].correctAnswer,
  currIcon: STORE[questionNumber].icon,
  currAlt: STORE[questionNumber].alt,
  currCorrect: 0
};

function updateCurrentState(questionNumber) {


  currentState.currqNum = questionNumber;
  currentState.currQ = STORE[questionNumber].question;
  currentState.currAnswers = STORE[questionNumber].answers;
  currentState.currCorrectAnswer= STORE[questionNumber].correctAnswer;
  currentState.currIcon = STORE[questionNumber].icon;
  currentState.currAlt = STORE[questionNumber].alt;

}


//called when the "start quiz" button is clicked on the first screen
function startQuiz() {
  $('#startBtn').on('click', function() { 
    $(this).remove();
    $('#questionBox').css('display', 'block');
    $('.questionNumber').text(questionNumber+1);
    $('.score').text(0);

  });
}

//generates the first question view
function renderView() {
  
  $('#questionBox').html(generateQuestion());
  generateQuestion();
}

function generateQuestion() {
  if (questionNumber < STORE.length) {
    return `<div class="question-${questionNumber}">
    <h2>${currentState.currQ}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${
  currentState.currAnswers[0]
}" name="answer" required>
    <span>${currentState.currAnswers[0]}</span> 
    </label>
    <label class="answerOption">
    <input type="radio" value="${
  currentState.currAnswers[1]
}" name="answer" required>
    <span>${currentState.currAnswers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${
  currentState.currAnswers[2]
}" name="answer" required>
    <span>${currentState.currAnswers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${
  currentState.currAnswers[3]
}" name="answer" required>
    <span>${currentState.currAnswers[3]}</span>
    </label>
    <input type="submit" class="submitButton">
    </fieldset>
    </form>
    </div>`;
  } else {
    Results();
    
  }
}

function handleClickSubmitBtn() {
  $('form').on('submit',  function(event) {
    event.preventDefault();
    checkAnswer();
    
  
  });
}




//Need a check Answer function
function checkAnswer () {
  let selectedAnswer = $('input[type = "radio"]:checked').val();
  if(selectedAnswer === currentState.currCorrectAnswer)
  {
    currentState.currCorrect++;
    $('.score').text(currentState.currCorrect);
    displayQuestionResultCorrect();
  }
  else
  {
    displayQuestionResultWrong();
  }

}

function displayQuestionResultCorrect () {

  $(`.question-${questionNumber}`).css('display','none');
  $('#questionBox').html(`<img class= "icon" src=${currentState.currIcon}>
  <p> "Correct!" </p> 
  <button type="submit" class="nextButton">Next</button>`);
  handleNextButton();

}


function displayQuestionResultWrong () {

  $(`.question-${questionNumber}`).css('display','none');
  $('#questionBox').html(`<img class= "icon" src=${currentState.currIcon}>
  <p> "Incorrect. The correct answer is ${currentState.currCorrectAnswer}" </p> 
  <button type="submit" class="nextButton">Next</button>`);
  handleNextButton();

}


function handleNextButton(){
  $('.nextButton').on('click', function(event) {
    event.preventDefault();
    questionNumber++;
    if(questionNumber < STORE.length)
    {
      updateCurrentState(questionNumber);
      $('.questionNumber').text(questionNumber+1);

    }
    renderView();
    handleClickSubmitBtn();  

  });

}

function Results() {

  $('#questionBox').html(`
  <p> "You had ${currentState.currCorrect} out of ${questionNumber} correct" </p> 
  <button type="submit" class="resetQuizButton">Reset Quiz</button>`);
   
  restartQuiz();


}


//Calls all other functions
function handleQuiz() {
  startQuiz();
  renderView();
  handleClickSubmitBtn();  
}


function restartQuiz() {
  $('.resetQuizButton').on('click', function(event) {
    questionNumber = 0;
    $('.questionNumber').text(questionNumber+1);
    $('.score').text(0);
    updateCurrentState(questionNumber);
    currentState.currCorrect = 0;
    renderView();
    handleClickSubmitBtn();  

  });
}

$(handleQuiz());
