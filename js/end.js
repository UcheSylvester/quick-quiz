const username = document.getElementById('username')
const saveScoreBtn = document.getElementById('saveScoreBtn')
const finalScore = document.getElementById('finalScore')
const saveHighScoreForm = document.getElementById('saveHighScoreForm')
const scoreMessage = document.getElementById('scoreMessage')
const playAgainBtns = document.querySelectorAll('.playAgainBtn')
const goHomeBtn = document.getElementById('goHome')

const shareBtn = document.getElementById('shareBtn')
const shareBtnContainer = document.getElementById('shareBtnContainer')

const mostRecentscore = +localStorage.getItem('mostRecentScore')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

playAgainBtns.forEach(button => button.addEventListener('click', () => window.location.assign('/pages/game.html')))

goHomeBtn.addEventListener('click', () => window.location.assign('/'))

const isValidHighScore = (highScores.length === 0 && mostRecentscore > 30)
  ? true
  : highScores.some((highScore) => (mostRecentscore > highScore.score))

if (isValidHighScore) {
  // show save high score 
  saveHighScoreForm.classList.remove('hidden')

} else {
  // show congratulatory message
  scoreMessage.innerText = 'Your score is';
  playAgainBtns[1].classList.remove('hidden')
}

// displaying the final score;
finalScore.innerText = mostRecentscore || 0;

// Toggling saveScoreBtn disable mode
username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value
})

const saveHighScore = (e) => {
  e.preventDefault()

  const score = {
    score: mostRecentscore,
    username: username.value
  }

  highScores.push(score)

  // sorting in ascending order
  highScores.sort((a, b) => b.score - a.score)

  // Removing other scores at the 5th index, still sorting in ascending order
  highScores.splice(5)

  localStorage.setItem('highScores', JSON.stringify(highScores))

  window.location.assign('/')

}


// shareBtn.addEventListener('click', () => {
//   const score = finalScore.innerHTML
//   const title = window.document.title.replace(/ - Congrats/g, '');
//   const url = "https://quiz-time.netlify.com/";

//   const data = {
//     url: url,
//     text: `I scored ${score} in ${title}! Play now!`
//   }

//   console.log(data)

//   if (navigator.share) {
//     console.log('share')

//     navigator.share(data)
//       .then(console.log('thanks for sharing'))
//       .catch(console.error)

//   } else {
//     console.log('no')
//   }
// })

const showShareBtn = () => {
  const score = finalScore.innerHTML
  const title = window.document.title.replace(/ - Congrats/g, '');
  const url = "https://quiz-time.netlify.com/";
  console.log(score, title, url)

  shareBtnContainer.innerHTML = `
    <button class="button" data-sharer="twitter" data-title="I played ${title} and scored ${score}! Play now!" data-hashtags="awesome, QuizTime" data-url="${url}">Share on Twitter</button>
  
    `

  window.Sharer.init();
}

window.addEventListener('DOMContentLoaded', showShareBtn)