const startButton = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const nextQuestion = document.getElementById("controls");
const nextButton = document.getElementById("next-btn");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answers-container");
const containerElement = document.getElementById("container");
const resultElement = document.getElementById('result');
const resultButton = document.getElementById('result-btn');
const correctAnswers = document.getElementById('correct');
startButton.addEventListener("click", startGame);


let state = false;

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
let shuffledQuestions, currentQuestionIndex;
let count = 0;


class showCorrect {
  constructor() {
    this.state = true;
  }
}
function startGame() {
  console.log("started");
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
  resultElement.classList.add('hide');
  console.log(resultElement);
}
function restartGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
  resultElement.classList.add('hide');
  window.location.reload();
  console.log(resultElement);
}
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}
function showQuestion(question) {
  questionElement.innerText = currentQuestionIndex + 1  + '. ' + question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.classList.add("answers");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
function resetState() {
  nextButton.classList.add("hide");
  clearStatusClass(document.body);
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if(correct) {
    count ++;
  }
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove("hide");
    } 
    else if(shuffledQuestions.length === currentQuestionIndex + 1) {
      
        resultButton.classList.remove('hide');
        resultButton.addEventListener('click', () => {
            resultElement.classList.remove('hide');
            let text = '';
            text = document.createTextNode(`Result: ${count.toString()} out of 5`);
            resultElement.appendChild(text);
            count = 0;
            resultButton.classList.add('hide');
            startButton.innerText = "Restart";
            startButton.classList.remove("hide");
            startButton.addEventListener("click", restartGame);
            // correctAnswers.classList.remove("hide");
        });
    }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
const questions = [
  {
    question: "What is actually electricity?",
    answers: [
      { text: "a. A flow of water", correct: false },
      { text: "b. A flow of air", correct: false },
      { text: "c. A flow of electrons", correct: true },
      { text: "d. A flow of atoms", correct: false },
    ],
  },
  {
    question: "Which two months are named after Emperors of the Roman Empire?",
    answers: [
      { text: "a. January and February", correct: false },
      { text: "b. March and April", correct: false },
      { text: "c. May and June", correct: false },
      { text: "d. July and August", correct: true },
    ],
  },
  {
    question: "What does the term “SOS” commonly stand for?",
    answers: [
      { text: "a. Save Our Sheep", correct: false },
      { text: "b. Save Our Souls", correct: true },
      { text: "c. Save Our Seal", correct: false },
      { text: "d. Save Our Ship", correct: false },
    ],
  },
  {
    question: "What is the main component of the sun?",
    answers: [
      { text: "a. Liquid lava", correct: false },
      { text: "b. Molten iron", correct: false },
      { text: "c. Gas", correct: true },
      { text: "d. Rock", correct: false },
    ],
  },
  {
    question: "Which company is known for publishing the Mario video game?",
    answers: [
      { text: "a. Xbox ", correct: false },
      { text: "b. Nintendo", correct: true },
      { text: "c. SEGA", correct: false },
      { text: "d. Electronic Arts", correct: false },
    ],
  },
];
