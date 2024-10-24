"use strict";

// Select elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.querySelector(`#score--1`);
const currentScore0El = document.querySelector(`#current--0`);
const currentScore1El = document.querySelector(`#current--1`);
const diceEl = document.querySelector(`.dice`);
const newBtn = document.querySelector(`.btn--new`);
const rollBtn = document.querySelector(`.btn--roll`);
const holdBtn = document.querySelector(`.btn--hold`);

let scores, currentScore, activePlayer, isPlaying;

// Starting conditions
function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = currentScore;
  currentScore1El.textContent = currentScore;

  diceEl.classList.add(`hidden`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
}

// call starting condition function
init();

// switch player function
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
}

// rolling dice function
rollBtn.addEventListener(`click`, function () {
  if (isPlaying) {
    //1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled = 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener(`click`, function () {
  if (isPlaying) {
    // 1. add current score to active player's score
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // finish the game
      isPlaying = false;
      diceEl.classList.add(`hidden`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

newBtn.addEventListener(`click`, init);
