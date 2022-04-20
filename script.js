'use strict';

//  declaring variables for player core selection
const elementScore0 = document.getElementById('score--0');
const elementScore1 = document.querySelector('#score--1');

// for selecting dice image
const diceElement = document.querySelector('.dice');

// variables for btn operations
const btnRollNew = document.querySelector('.btn--new');
const btnRollUp = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// selecting players
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// variables for scores
const currentElement0 = document.getElementById('current--0');
const currentElement1 = document.getElementById('current--1');

// scores of active player and scores for both
let currentScore;
let activePlayer;
let scores;

// condition for playing
let playing;

// changing score to 0 and adding class for dice
// elementScore0.textContent = 0;
// elementScore1.textContent = 0;
// diceElement.classList.add('hidden');

// restart game function or initial start function
const restart = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceElement.classList.add('hidden');

  player0.classList.add('player--active');
  player1.classList.remove('player--active');

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');

  elementScore0.textContent = 0;
  elementScore1.textContent = 0;
  currentElement0.textContent = 0;
  currentElement1.textContent = 0;
};
restart();

// selecting active player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// dice rotation with score allotting and increase
btnRollUp.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    // checking if dice number is 1 or not
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switching player
      switchPlayer();
    }
  }
});

// setting hold button functionality.
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //   winner declaration
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switching player
      switchPlayer();
    }
  }
});

// restarting game
btnRollNew.addEventListener('click', restart);
