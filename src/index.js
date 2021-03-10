const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const gameScreen = document.querySelector('.wrapper');
const gameOverScreen = document.querySelector('.gameOverScreen');
const totalScore = document.querySelector('.totalScore');
const bestScore = document.querySelector('.bestScore');
const zeroScore = document.querySelector('.zeroScore');

const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');


let lastHole;
let timeUp = false;
let timeLimit = 10000;
let score = 0;
let countdown;
let bestScoreNumber = 0;

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', restartGame);

function pickRandomHole(holes) {
    const randomHole = Math.floor(Math.random() * holes.length)
    const hole = holes[randomHole];
    if (hole === lastHole) {
        return pickRandomHole(holes);
    }
    lastHole = hole;
    return hole;
};

function popOut() {
    const time = Math.random() * 1500;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');
    setTimeout(function (){
        hole.classList.remove('up');
        if (!timeUp) popOut();
    }, time)
};

function startGame() {
    gameScreen.classList.toggle('wrapper_visible')
    countdown = timeLimit/1000;
    score = 0;
    scoreBoard.textContent = 'Whacked: ' + score;
    scoreBoard.style.display = 'block';
    countdownBoard.textContent = 'Time left: ' + countdown;
    timeUp = false;
    score = 0;
    popOut();
    setTimeout(function (){
        timeUp = true;
    }, timeLimit);

    let startCountdown = setInterval(function (){
        countdown -= 1;
        countdownBoard.textContent = 'Time left: ' + countdown;
        if (countdown <= 0) {
            countdown = 0;
            clearInterval(startCountdown);
            // countdown.textContent = 'Times up!'
            gameScreen.classList.toggle('.wrapper_hidden');
            resetButton.classList.remove('visibility-hidden');
            gameOverScreen.classList.add('visible');
            showZero();
        }
    },1000);
};

function showZero() {
    if (score < 1) {
        zeroScore.classList.add('visible');
        zeroScore.textContent = 'Whacked 0 moles. You can do better!';
    }
};


function restartGame() {
    gameOverScreen.classList.toggle('visible');
    gameScreen.classList.toggle('visible');
    zeroScore.classList.remove('visible');
    startGame()
};

function whack(e) {
    score++;
    this.style.backgroundImage = "url('images/whacked.png')";
    this.style.pointerEvents = 'none';
    setTimeout(() => {
        this.style.backgroundImage = "url('images/mole.png')";
        this.style.pointerEvents = 'all';
    }, 800);
    scoreBoard.textContent = 'Whacked: ' + score;
    // countdown +=1;

    if (score > bestScoreNumber) {
        bestScoreNumber = score;
        console.log(bestScoreNumber)
    }
    totalScore.textContent = 'Your total score: ' + score;
    bestScore.textContent = 'Your best score: ' + bestScoreNumber;
};

moles.forEach(mole => mole.addEventListener('click', whack));
