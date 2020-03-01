const question = document.getElementById("question");
const scoreText = document.getElementById("score");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBarFull");
const game = document.getElementById("game");
const loader = document.querySelector(".loader");
const passed = document.getElementById("passed");
const failed = document.getElementById("failed");
const difficultyInputs = Array.from(
  document.querySelectorAll("form#difficultyForm input")
);
const difficultyForm = document.getElementById("difficultyForm");
const choicesContainer = document.querySelector(".choices-container");
let choices = [];

const questionChoicesMap = {
  0: "A",
  1: "B",
  2: "C",
  3: "D"
};

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let correctAnswer;
let passedCounter = 0;
let failedCounter = 0;
let questions = [];

let apiURL = "";

const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";

const decodeHTMLCharacters = sentence =>
  sentence
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lrm;/g, "");

// Setting game difficulty from users input
difficultyInputs.forEach(input =>
  input.addEventListener("click", event => getQuestions(event))
);

const formatLoadedQuestions = loadedQuestions => {
  const formattedQuestions = loadedQuestions.results.map(loadedQuestion => {
    // console.log(loadedQuestion.correct_answer)
    const formattedQuestion = {
      question: loadedQuestion.question
    };

    const answerChoices = [...loadedQuestion.incorrect_answers];
    formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;

    answerChoices.splice(
      formattedQuestion.answer - 1,
      0,
      loadedQuestion.correct_answer
    );

    answerChoices.forEach((choice, index) => {
      formattedQuestion[`choice${index + 1}`] = choice;
    });

    return formattedQuestion;
  });

  return formattedQuestions;
};

const getQuestions = e => {
  // adding delay before showing loader and hiding the form
  setTimeout(() => {
    difficultyForm.style.display = "none";
    loader.classList.remove("hidden");
  }, 150);

  apiURL = `https://opentdb.com/api.php?amount=10&difficulty=${e.target.value}`;

  fetch(apiURL)
    .then(response => response.json())
    .then(loadedQuestions => {
      // formating the loaded question into what we need
      questions = formatLoadedQuestions(loadedQuestions);

      loader.classList.add("hidden");

      startGame();
    })
    .catch(err => {
      console.log(err);
      loader.classList.add("hidden");
      difficultyForm.style.display = "block";
      difficultyForm.classList.add("error");

      difficultyForm.innerText = `An error occurred, please try again later 😒😒😓`;
    });
};

const startGame = () => {
  // reseting util variables at game start
  // Getting a copy of the questions into available question using spread operator
  questionCounter = 0;
  score = 0;
  failedCounter = 0;
  passedCounter = 0;
  availableQuestions = [...questions];

  // Removing loader and showing game
  loader.classList.add("hidden");
  game.classList.remove("hidden");

  // Getting a new question
  getNewQuestion();
};

const getNewQuestion = () => {
  // when questions are finished or we've reached the maximum number of question a user can anwser
  // go to end page
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // save recent score to localstorage
    localStorage.setItem("mostRecentScore", score);

    // go to end page
    return window.location.assign("../pages/end.html");
  }

  // Increasing the question couter and progressbar
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBar.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  // Get a random question and assign it to currentQeustion
  const newQestionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[newQestionIndex];

  // Display the current question
  question.innerText = decodeHTMLCharacters(currentQuestion.question);

  const questionChoices = Object.entries(currentQuestion).slice(2);

  choicesContainer.innerHTML = questionChoices.map((choice, index) => {
    const [dataNumber, option] = choice;
    const number = dataNumber.split("").pop();

    return `
    <div class="choice-container">
      <p class="choice-prefix">  ${questionChoicesMap[`${index}`]} </p>
      <p class="choice-text" data-number=${number}> ${option} </p>
    </div>
    `;
  });

  choices = Array.from(document.querySelectorAll(".choice-text"));

  checkAnswer(choices);

  // // Display the choices
  // choices.forEach(choice => {
  //   const number = choice.dataset["number"];
  //   console.log(choice, number);

  //   choice.innerText = currentQuestion["choice" + number];
  // });

  // removing the current question so it doesn't get asked again
  availableQuestions.splice(newQestionIndex, 1);

  acceptingAnswers = true;
};

// Get and style correct answer
const getCorrectAnswer = choices => {
  choices.forEach(choice => {
    if (+choice.dataset["number"] === currentQuestion.answer)
      correctAnswer = choice;
  });

  setTimeout(() => {
    correctAnswer.classList.add("correct");
  }, 300);

  setTimeout(() => {
    correctAnswer.classList.remove("correct");
  }, 1000);
};

// Check for correct answer
const checkAnswer = choices => {
  choices.forEach((choice, index, choices) => {
    choice.addEventListener("click", e => {
      // stop if we are not accepting questions
      if (!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = +choice.dataset["number"];

      // Styles to apply if answer is correct or not
      const classToApply =
        selectedAnswer === currentQuestion.answer ? "correct" : "incorrect";

      selectedChoice.parentElement.classList.add(classToApply);

      if (classToApply === "correct") {
        incrementScore(CORRECT_BONUS);
        passedCounter++;
        passed.innerText = `Passed - ${passedCounter}`;
      } else {
        failedCounter++;
        failed.innerText = `Failed - ${failedCounter}`;
      }

      // delay the style before moving to next question
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);

      getCorrectAnswer(choices);
    });
  });
};

const incrementScore = number => {
  score += number;
  scoreText.innerText = score;
};
