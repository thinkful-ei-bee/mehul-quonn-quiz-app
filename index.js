'use strict';
/* global $ */

let questionNumber = 0;

// to be updated every time question number is incremented

const currentState= {
  currqNum: 0,
  currQ: STORE[0].question,
  currAnswers: STORE[this.currqNum].answers,
  currCorrectAnswer: STORE[this.currqNum].correctAnswer,
  currIcon: STORE[this.currqNum].icon,
  currAlt: STORE[this.currqNum].alt,
  currCorrect: 0
};


//called when the "start quiz" button is clicked on the first screen
function startQuiz() {
  $('#startBtn').on('click', function() { 
    $(this).remove();
    $('#questionBox').css('display', 'block');
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
  currentState.Answers[0]
}" name="answer" required>
    <span>${currentState.Answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${
  currentState.Answers[1]
}" name="answer" required>
    <span>${currentState.Answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${
  currentState.Answers[2]
}" name="answer" required>
    <span>${currentState.Answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${
  currentState.Answers[3]
}" name="answer" required>
    <span>${currentState.Answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
  } else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(10);
  }
}

function handleClickSubmitBtn() {
  $('form').on('click', 'button', function(event) {
    event.preventDefault();
    questionNumber++;
    console.log(STORE.length, questionNumber);
    renderView();
    handleClickSubmitBtn();  

  });
}

function renderResults() {
  console.log('render results');
}

function nextQuestion() {
  renderView();


}

//Need a check Answer function
function checkAnswer () {

}


//Calls all other functions
function handleQuiz() {
  startQuiz();
  renderView();
  handleClickSubmitBtn();  
}


function restartQuiz() {
  console.log('restart quiz');
}

$(handleQuiz());
