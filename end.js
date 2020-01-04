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
  e.preventDefault()

  const score = {
    score: Math.floor(Math.random() * 100),
    username: username.value
  }

  highScores.push(score)

  // sorting in ascending order
  highScores.sort((a, b) => b.score - a.score)

  // Removing other scores at the 5th index, still sorting in ascending order
  highScores.splice(5)

  localStorage.setItem('highScores', JSON.stringify(highScores))
  console.log(highScores)

}