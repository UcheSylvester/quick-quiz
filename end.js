const username = document.getElementById('username')
const saveScoreBtn = document.getElementById('saveScoreBtn')
const finalScore = document.getElementById('finalScore')

const score = localStorage.getItem('mostRecentScore')

// displaying the final score;
finalScore.innerText = score;

// Toggling saveScoreBtn disable mode
username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value
})

const saveHighScore = (e) => {
  console.log('hello')
  e.preventDefault()
}