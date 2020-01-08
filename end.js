const username = document.getElementById('username')
const saveScoreBtn = document.getElementById('saveScoreBtn')
const finalScore = document.getElementById('finalScore')
const saveHighScoreForm = document.getElementById('saveHighScoreForm')
const scoreMessage = document.getElementById('scoreMessage')
const playAgainBtn = document.getElementById('playAgainBtn')

const mostRecentscore = +localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const isValidHighScore = (!highScores.length && mostRecentscore > 30)
  ? true
  : highScores.some((highScore) => (mostRecentscore > highScore.score))

console.log(isValidHighScore)

if (isValidHighScore) {
  // show save high score 
  saveHighScoreForm.classList.remove('hidden')

} else {
  // show congratulatory message
  scoreMessage.innerText = 'Your score is';
  playAgainBtn.classList.remove('hidden')
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