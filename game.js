const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'))

let currentQuestion = {}
let acceptingAnswers = true;
let scores = 0;
let questionCounter = 0;
let availableQuestions = []

let questions = [
  {
    question: "1inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question: "What is the correct syntax for referring to an external script called xxx.js??",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice2: "<script src='xxx.js'>",
    choice2: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question: "2inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question: "3inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
]

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

const startGame = () => {
  // reseting util variables at game start
  // Getting a copy of the questions into available question using spread operator
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions]

  // Getting a new question
  getNewQuestion()
}

const getNewQuestion = () => {
  // Increasing the question by 1
  questionCounter++

  // Get a random question and assign it to currentQeustion
  const newQestionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[newQestionIndex]

  // Display the current question 
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion["choice" + number]
  })
}

startGame()