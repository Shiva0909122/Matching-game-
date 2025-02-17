const gameBoard = document.getElementById('gameBoard');
const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...cardValues, ...cardValues]; // Duplicate for pairs
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Shuffle cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Initialize the game
function initializeGame() {
  cards = shuffle(cards);
  cards.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.innerHTML = '?';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

// Flip card logic
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flipped');
  this.innerHTML = this.dataset.value;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

// Check if the two flipped cards match
function checkForMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;

  isMatch ? disableCards() : unflipCards();
}

// Disable cards if matched
function disableCards() {
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');
  resetBoard();
}

// Unflip cards if not matched
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    firstCard.innerHTML = '?';
    secondCard.classList.remove('flipped');
    secondCard.innerHTML = '?';
    resetBoard();
  }, 1000);
}

// Reset selection
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Start the game
initializeGame();
