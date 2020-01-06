const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'))
const scoreText = document.getElementById('score')
const progressText = document.getElementById('progressText')
const progressBar = document.getElementById('progressBarFull')

let currentQuestion = {}
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = []
let correctAnswer

let questions = []

fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data
    startGame()
  })
  .catch(console.log)

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

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
  // when questions are finished or we've reached the maximum number of question a user can anwser
  // go to end page

  if (!availableQuestions.length || questionCounter >= MAX_QUESTIONS) {
    // save recent score to localstorage
    localStorage.setItem('mostRecentScore', score)

    // go to end page
    // return window.location.assign("/end.html")
  }

  // Increasing the question couter and progressbar
  questionCounter++
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`
  progressBar.style.width = `${questionCounter / MAX_QUESTIONS * 100}%`;

  // Get a random question and assign it to currentQeustion
  const newQestionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[newQestionIndex]

  // Display the current question 
  question.innerText = currentQuestion.question;

  // Display the choices
  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion["choice" + number]
  })

  // removing the current question so it doesn't get asked again
  availableQuestions.splice(newQestionIndex, 1);

  acceptingAnswers = true;

}

// Get and style correct answer 
const getCorrectAnswer = (choices) => {
  choices.forEach(choice => {
    if (+choice.dataset['number'] === currentQuestion.answer)
      correctAnswer = choice
  })

  setTimeout(() => {
    correctAnswer.classList.add('correct')
  }, 300)

  setTimeout(() => {
    correctAnswer.classList.remove('correct')
  }, 1000)
}


// Check for correct answer
choices.forEach((choice, index, choices) => {

  choice.addEventListener('click', e => {
    // stop if we are not accepting questions
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = +choice.dataset['number']

    // Styles to apply if answer is correct or not
    const classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect'

    selectedChoice.parentElement.classList.add(classToApply)

    // console.log(selectedAnswer, currentQuestion, choices)

    if (classToApply === 'correct')
      incrementScore(CORRECT_BONUS)


    // delay the style before moving to next question
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    }, 1000)

    getCorrectAnswer(choices)

  })
})

const incrementScore = number => {
  score += number
  scoreText.innerText = score;
}

