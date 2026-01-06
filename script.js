const gameData = {
    1: [{ name: 'tamago', i1: 'lvl1_tamago1.png', i2: 'lvl1_tamago2.png' }, { name: 'neko', i1: 'lvl1_neko1.png', i2: 'lvl1_neko2.png' }, { name: 'sakura', i1: 'lvl1_sakura1.png', i2: 'lvl1_sakura2.png' }, { name: 'sushi', i1: 'lvl1_sushi1.png', i2: 'lvl1_sushi2.png' }, { name: 'mizu', i1: 'lvl1_mizu1.png', i2: 'lvl1_mizu2.png' }, { name: 'ramen', i1: 'lvl1_ramen1.png', i2: 'lvl1_ramen2.png' }, { name: 'terebi', i1: 'lvl1_terebi1.png', i2: 'lvl1_terebi2.png' }, { name: 'cake', i1: 'lvl1_cake1.png', i2: 'lvl1_cake2.png' }, { name: 'coffee', i1: 'lvl1_coffee1.png', i2: 'lvl1_coffee2.png' }],
    2: [{ name: 'gakkou', i1: 'lvl2_gakkou1.png', i2: 'lvl2_gakkou2.png' }, { name: 'ie', i1: 'lvl2_ie1.png', i2: 'lvl2_ie2.png' }, { name: 'eki', i1: 'lvl2_eki1.png', i2: 'lvl2_eki2.png' }, { name: 'yama', i1: 'lvl2_yama1.png', i2: 'lvl2_yama2.png' }, { name: 'ginkou', i1: 'lvl2_ginkou1.png', i2: 'lvl2_ginkou2.png' }, { name: 'byouin', i1: 'lvl2_byouin1.png', i2: 'lvl2_byouin2.png' }, { name: 'ichi', i1: 'lvl2_ichi1.png', i2: 'lvl2_ichi2.png' }, { name: 'go', i1: 'lvl2_go1.png', i2: 'lvl2_go2.png' }, { name: 'hachi', i1: 'lvl2_hachi1.png', i2: 'lvl2_hachi2.png' }],
    3: [{ name: 'taberu', i1: 'lvl3_taberu1.png', i2: 'lvl3_taberu2.png' }, { name: 'nomu', i1: 'lvl3_nomu1.png', i2: 'lvl3_nomu2.png' }, { name: 'miru', i1: 'lvl3_miru1.png', i2: 'lvl3_miru2.png' }, { name: 'kiku', i1: 'lvl3_kiku1.png', i2: 'lvl3_kiku2.png' }, { name: 'hanasu', i1: 'lvl3_hanasu1.png', i2: 'lvl3_hanasu2.png' }, { name: 'ookii', i1: 'lvl3_ookii1.png', i2: 'lvl3_ookii2.png' }, { name: 'chiisai', i1: 'lvl3_chiisai1.png', i2: 'lvl3_chiisai2.png' }, { name: 'suki', i1: 'lvl3_suki1.png', i2: 'lvl3_suki2.png' }, { name: 'shizuka', i1: 'lvl3_shizuka1.png', i2: 'lvl3_shizuka2.png' }]
};

let currentLevel = 1;
let flippedCards = [];
let matchedCount = 0;
let timer;
let timeLeft = 0;
let isPaused = false;
let isPreviewing = false;

const landingPage = document.getElementById('landing-page');
const gameScreen = document.getElementById('game-screen');
const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const previewOverlay = document.getElementById('preview-overlay');

const playAudio = (id) => {
    const audio = document.getElementById(id);
    if (audio) { audio.currentTime = 0; audio.play().catch(e => console.log(e)); }
};

document.getElementById('start-btn').addEventListener('click', () => {
    currentLevel = parseInt(document.getElementById('level-dropdown').value);
    initGame();
});

function initGame() {
    landingPage.style.display = 'none';
    gameScreen.style.display = 'flex';
    document.querySelectorAll('.popup-overlay').forEach(p => p.style.display = 'none');
    document.getElementById('current-level-title').textContent = `Level ${currentLevel}`;
    
    timeLeft = (currentLevel === 1) ? 120 : (currentLevel === 2) ? 180 : 300;
    matchedCount = 0;
    flippedCards = [];
    isPaused = false;
    isPreviewing = true;
    document.getElementById('pause-btn').textContent = 'Pause';
    
    updateScore();
    updateTimerDisplay();
    renderBoard(true); 
    
    playAudio('audio-start');
    previewOverlay.style.display = 'block';

    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => card.classList.remove('flipped'));
        previewOverlay.style.display = 'none';
        isPreviewing = false;
        startTimer();
    }, 5000);
}

function renderBoard(showPreview) {
    board.innerHTML = '';
    const levelPairs = gameData[currentLevel];
    const cards = [];
    levelPairs.forEach(pair => {
        cards.push({ name: pair.name, img: pair.i1 });
        cards.push({ name: pair.name, img: pair.i2 });
    });
    
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    
    cards.forEach(cardData => {
        const cardObj = document.createElement('div');
        cardObj.classList.add('card');
        if (showPreview) cardObj.classList.add('flipped');
        cardObj.innerHTML = `
            <div class="card-inner">
                <div class="card-back"></div>
                <div class="card-front"><img src="assets/images/${cardData.img}"></div>
            </div>
        `;
        cardObj.addEventListener('click', () => flipCard(cardObj, cardData));
        board.appendChild(cardObj);
    });
}

function flipCard(cardObj, data) {
    if (isPaused || isPreviewing || flippedCards.length === 2 || cardObj.classList.contains('flipped')) return;
    cardObj.classList.add('flipped');
    playAudio('audio-flip');
    flippedCards.push({ cardObj, data });
    if (flippedCards.length === 2) {
        const [c1, c2] = flippedCards;
        if (c1.data.name === c2.data.name) {
            matchedCount++;
            c1.cardObj.classList.add('matched');
            c2.cardObj.classList.add('matched');
            updateScore();
            playAudio('audio-correct');
            flippedCards = [];
            if (matchedCount === 9) showEndPopup('win-popup');
        } else {
            playAudio('audio-wrong');
            setTimeout(() => {
                c1.cardObj.classList.remove('flipped');
                c2.cardObj.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }
}

function showEndPopup(popupId) {
    clearInterval(timer);
    const popup = document.getElementById(popupId);
    if (popupId === 'win-popup') {
        popup.querySelector('.end-score-win').textContent = matchedCount;
        playAudio('audio-win');
        setTimeout(() => playAudio('audio-score'), 800);
        const nextBtn = document.getElementById('next-level-btn');
        if (currentLevel < 3) {
            nextBtn.style.display = 'inline-block';
            nextBtn.onclick = () => { currentLevel++; initGame(); };
        } else { nextBtn.style.display = 'none'; }
    } else {
        popup.querySelector('.end-score').textContent = matchedCount;
        playAudio('audio-gameover');
        setTimeout(() => playAudio('audio-score'), 500);
    }
    popup.style.display = 'flex';
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft <= 0) showEndPopup('game-over-popup');
        }
    }, 1000);
}

function updateTimerDisplay() {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    timerDisplay.textContent = `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function updateScore() {
    scoreDisplay.textContent = `${matchedCount}/9`;
}

document.getElementById('pause-btn').addEventListener('click', (e) => {
    isPaused = !isPaused;
    playAudio('audio-pause');
    e.target.textContent = isPaused ? 'Resume' : 'Pause';
});

document.getElementById('restart-game-btn').addEventListener('click', initGame);
document.getElementById('menu-btn').addEventListener('click', resetToMenu);

function resetToMenu() {
    clearInterval(timer);
    landingPage.style.display = 'flex';
    gameScreen.style.display = 'none';
    document.querySelectorAll('.popup-overlay').forEach(p => p.style.display = 'none');
}
