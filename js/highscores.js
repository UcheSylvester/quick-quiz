const highScoresList = document.getElementById('highScoresList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []
const noHighScore = document.getElementById('noHighScore')

if (!highScores.length) {
  noHighScore.classList.remove('hidden')
}


highScoresList.innerHTML = highScores.map(score => {
  return `<li class='high-score'>${score.username} - ${score.score} </li>`
}).join('')


