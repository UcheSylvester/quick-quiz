const username = document.getElementById('username')
const saveScoreBtn = document.getElementById('saveScoreBtn')
const finalScore = document.getElementById('finalScore')

const mostRecentscore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []
console.log(highScores)

// displaying the final score;
finalScore.innerText = mostRecentscore || 0;

// Toggling saveScoreBtn disable mode
username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value
})

const saveHighScore = (e) => {
  console.log('hello')
  e.preventDefault()

  const score = {
    score: mostRecentscore || 0,
    username: username.value
  }

  highScores.push(score)

  localStorage.setItem('highScores', JSON.stringify(highScores))
}