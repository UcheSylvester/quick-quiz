const username = document.getElementById('username')
const saveScoreBtn = document.getElementById('saveScoreBtn')
const finalScore = document.getElementById('finalScore')
const saveHighScoreForm = document.getElementById('saveHighScoreForm')
const scoreMessage = document.getElementById('scoreMessage')
const playAgainBtns = document.querySelectorAll('.playAgainBtn')
const goHomeBtn = document.getElementById('goHome')
const overlay = document.querySelector('.overlay')

const shareBtn = document.getElementById('shareBtn')
const shareContainer = document.querySelector('.shareContainer')

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


const share = () => {
  const score = finalScore.innerHTML
  const title = window.document.title.replace(/ - Congrats/g, '');
  const url = "https://quiz-time.netlify.com/";
  console.log(score, title, url)

  overlay.classList.remove('hidden')

  if (navigator.share) {
    const data = {
      url: url,
      text: `I played ${title} and got a score of ${score} 😄😄🔥🚀🔥🚀! Give it a try! #awesome #QuizTime @UCylvester`
    }

    navigator.share(data)
      .then(data => console.log('Thanks for sharing', data))
      .catch(console.error)
  } else {

    shareContainer.innerHTML = `
    <p>Share now:</p>
      <div>
        <button 
          class="share-btn" 
          data-sharer="twitter" 
          data-hashtags="awesome, QuizTime" 
          data-url="${url}"
          data-via="UCylvester" 
          data-title="I played ${title} and got a score of ${score} 😄😄🔥🚀🔥🚀! Give it a try!" 
        >
          <img src="/images/twitter.png">
        </button>
        <button 
          class="share-btn" 
          data-sharer="facebook" 
          data-hashtag="QuizTime" 
          data-url="${url}"
        >
          <img src="/images/facebook.png">
        </button>
      </div>
    `

    shareContainer.classList.remove('hidden')
    window.Sharer.init();
  }
}

overlay.addEventListener('click', () => {
  shareContainer.classList.add('hidden')
  overlay.classList.add('hidden')
})

shareBtn.addEventListener('click', share)