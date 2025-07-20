// Game setup and assets
const cards = [
    { name: 'inu1', img: 'assets/images/inu1.png', text: 'いぬ', meaning: 'Dog', romaji: 'inu' },
    { name: 'inu2', img: 'assets/images/inu2.png', text: 'Dog', meaning: 'Dog', romaji: 'inu' },
    { name: 'mizu1', img: 'assets/images/mizu1.png', text: 'みず', meaning: 'Water', romaji: 'mizu' },
    { name: 'mizu2', img: 'assets/images/mizu2.png', text: 'Water', meaning: 'Water', romaji: 'mizu' },
    { name: 'neko1', img: 'assets/images/neko1.png', text: 'ねこ', meaning: 'Cat', romaji: 'neko' },
    { name: 'neko2', img: 'assets/images/neko2.png', text: 'Cat', meaning: 'Cat', romaji: 'neko' },
    { name: 'ramen1', img: 'assets/images/ramen1.png', text: 'らーめん', meaning: 'Ramen', romaji: 'ramen' },
    { name: 'ramen2', img: 'assets/images/ramen2.png', text: 'Ramen', meaning: 'Ramen', romaji: 'ramen' },
    { name: 'sakura1', img: 'assets/images/sakura1.png', text: 'さくら', meaning: 'Cherry Blossom', romaji: 'sakura' },
    { name: 'sakura2', img: 'assets/images/sakura2.png', text: 'Cherry Blossom', meaning: 'Cherry Blossom', romaji: 'sakura' },
    { name: 'sushi1', img: 'assets/images/sushi1.png', text: 'すし', meaning: 'Sushi', romaji: 'sushi' },
    { name: 'sushi2', img: 'assets/images/sushi2.png', text: 'Sushi', meaning: 'Sushi', romaji: 'sushi' },
    { name: 'tamago1', img: 'assets/images/tamago1.png', text: 'たまご', meaning: 'Egg', romaji: 'tamago' },
    { name: 'tamago2', img: 'assets/images/tamago2.png', text: 'Egg', meaning: 'Egg', romaji: 'tamago' },
    { name: 'fuji1', img: 'assets/images/fuji1.png', text: 'ふじ', meaning: 'Mt. Fuji', romaji: 'fujisan' },
    { name: 'fuji2', img: 'assets/images/fuji2.png', text: 'Mt. Fuji', meaning: 'Mt. Fuji', romaji: 'fujisan' }
];

// Variables for game state
let flippedCards = [];
let matchedCards = [];
let score = 0;
let gameTimer;
let timeLeft = 120;
let isPaused = false;

// Elements
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const restartButton = document.getElementById('restart-btn');
const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

// Audio elements
const cardFlipAudio = new Audio('assets/audios/cardflip_1.mp3');
const correctMatchAudio = new Audio('assets/audios/correct_match.mp3');
const wrongMatchAudio = new Audio('assets/audios/wrong_match.mp3');
const gameOverAudio = new Audio('assets/audios/gameover.mp3');
const winAudio = new Audio('assets/audios/win.mp3');
const startGameAudio = new Audio('assets/audios/startgame.mp3');
const pauseResumeAudio = new Audio('assets/audios/pause_resume.mp3');

// Shuffle the cards
function shuffleCards() {
    return [...cards].sort(() => Math.random() - 0.5); // Shuffle
}

// Start the game
startButton.addEventListener('click', startGame);

// Restart the game
restartButton.addEventListener('click', startGame);

// Function to start the game
function startGame() {
    startGameAudio.play(); // Play start game audio
    startButton.style.display = 'none'; // Hide Start Game button
    pauseButton.style.display = 'inline-block';
    restartButton.style.display = 'inline-block'; // Show Restart button
    score = 0;
    scoreDisplay.textContent = `${score}/8`; // Show score as "X/8"
    gameBoard.innerHTML = '';  // Clear game board
    flippedCards = [];
    matchedCards = [];
    timeLeft = 120;
    timerDisplay.textContent = '02:00';
    
    const shuffledCards = shuffleCards();
    
    shuffledCards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');

        const cardFront = document.createElement('img');
        cardFront.src = card.img;
        cardFront.classList.add('card-front');

        cardElement.appendChild(cardBack);
        cardElement.appendChild(cardFront);
        
        cardElement.addEventListener('click', () => flipCard(cardElement, card));
        gameBoard.appendChild(cardElement);
    });
    
    startTimer();
}

// Flip card logic
function flipCard(cardElement, card) {
    if (flippedCards.length < 2 && !cardElement.classList.contains('flipped') && !isPaused) {
        cardElement.classList.add('flipped');  // Add flipped class to show front of the card
        const cardFront = cardElement.querySelector('.card-front');
        cardFront.style.display = 'block';  // Reveal the front of the card
        cardFlipAudio.play();
        
        flippedCards.push({ cardElement, card });
        
        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Check if cards match
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    const isMatch = firstCard.card.name.slice(0, -1) === secondCard.card.name.slice(0, -1); // Compare name without the last character

    if (isMatch) {
        // Add matched class to both cards
        firstCard.cardElement.classList.add('matched');
        secondCard.cardElement.classList.add('matched');
        matchedCards.push(firstCard, secondCard);
        score++; // Increase score by 1 for each match
        scoreDisplay.textContent = `${score}/8`; // Update score display
        correctMatchAudio.play();
        flippedCards = [];
        
        // Check if all pairs are matched
        if (matchedCards.length === cards.length) {
            clearInterval(gameTimer); // Stop the timer
            winAudio.play();
            alert('おめでとう！ You Won!');
            restartButton.style.display = 'inline-block'; // Show restart button
            startButton.disabled = false;
        }
    } else {
        wrongMatchAudio.play();
        setTimeout(() => {
            firstCard.cardElement.classList.remove('flipped');
            secondCard.cardElement.classList.remove('flipped');
            const cardFront1 = firstCard.cardElement.querySelector('.card-front');
            cardFront1.style.display = 'none';  // Hide front after a delay
            const cardFront2 = secondCard.cardElement.querySelector('.card-front');
            cardFront2.style.display = 'none';  // Hide front after a delay
            flippedCards = [];
        }, 1000);
    }
}

// Timer countdown
function startTimer() {
    gameTimer = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            if (timeLeft <= 0) {
                clearInterval(gameTimer);
                gameOverAudio.play();
                alert('Game Over! You took too long!');
                restartButton.style.display = 'inline-block'; // Show restart button
                startButton.style.display = 'inline-block'; // Show Start Game button
            }
        }
    }, 1000);
}

// Pause and Resume functionality
pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
    if (isPaused) {
        pauseResumeAudio.play(); // Play pause audio
        pauseButton.textContent = 'Resume';
        clearInterval(gameTimer);
    } else {
        pauseResumeAudio.play(); // Play resume audio
        pauseButton.textContent = 'Pause';
        startTimer();
    }
});