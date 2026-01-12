/* --- DATA --- */
const gameData = {
    general: {
        easy: ["Apple", "Car", "Dog", "House", "Ball", "Sun", "Book", "Chair", "Shoe", "Tree", "Moon", "Cat"],
        medium: ["Breakfast", "Football field", "Cinema", "Hospital", "Homework", "Summer", "Library", "Friend", "Weekend", "Holiday"],
        hard: [
            { word: "Democracy", forbidden: ["Vote", "Country", "Election"] },
            { word: "Freedom", forbidden: ["Free", "Prison", "Liberty"] },
            { word: "Jealousy", forbidden: ["Envy", "Girlfriend", "Want"] },
            { word: "Sustainability", forbidden: ["Green", "Earth", "Recycle"] },
            { word: "Politics", forbidden: ["Government", "Vote", "Minister"] },
            { word: "Economy", forbidden: ["Money", "Bank", "Rich"] },
            { word: "Education", forbidden: ["School", "Teacher", "Learn"] },
            { word: "Environment", forbidden: ["Nature", "Climate", "Green"] },
            { word: "Technology", forbidden: ["Computer", "Phone", "Digital"] }
        ]
    },
    gaming: {
        easy: ["Mouse", "Screen", "Keyboard", "Headset", "Phone", "iPad", "Wifi", "Battery"],
        medium: ["Streamer", "Level up", "Game Over", "Controller", "Online", "Update", "Loading", "Server"],
        hard: [
            { word: "Influencer", forbidden: ["Social Media", "Followers", "Instagram"] },
            { word: "Lag", forbidden: ["Slow", "Internet", "Glitch"] },
            { word: "Noob", forbidden: ["New", "Bad", "Player"] },
            { word: "Algorithm", forbidden: ["Math", "Code", "Feed"] },
            { word: "Viral", forbidden: ["Sickness", "Famous", "Internet"] }
        ]
    },
    school: {
        easy: ["Pen", "Desk", "Teacher", "Bus", "Lunch", "Book", "Gym", "Math"],
        medium: ["Principal", "Canteen", "Subject", "Blackboard", "Recess", "Library", "Exam", "Science"],
        hard: [
            { word: "Detention", forbidden: ["Punishment", "Stay", "School"] },
            { word: "Curriculum", forbidden: ["Plan", "Subjects", "Learn"] },
            { word: "Assignment", forbidden: ["Homework", "Task", "Teacher"] },
            { word: "Bullying", forbidden: ["Mean", "Fight", "Sad"] }
        ]
    }
};

/* --- STATE --- */
let activeCards = []; // De 8 valgte ordene
let score = 0;
let timer;
let timeRemaining;
let isUnlimitedTime = false;
let currentSelectedCardIndex = null; // Hvilket kort er snudd nå?
let wordsSolved = 0; // Teller for å vite når vi er ferdige
let roundHistory = [];

/* --- FUNCTIONS --- */

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.classList.add('hidden'); // Bruker CSS klasse for å skjule
        if(s.id === id) {
            s.classList.remove('hidden');
            s.classList.add('active');
        }
    });
}

function startGame() {
    const category = document.getElementById('category-select').value;
    const difficulty = document.getElementById('difficulty-select').value;
    const timeVal = document.getElementById('timer-select').value;

    // 1. Hent data
    let sourceData = gameData[category][difficulty];
    if (!sourceData || sourceData.length < 8) {
        alert("Not enough words in this category yet. Need at least 8.");
        return;
    }

    // 2. Velg 8 tilfeldige ord
    let shuffled = [...sourceData].sort(() => 0.5 - Math.random());
    activeCards = shuffled.slice(0, 8);

    // 3. Reset
    score = 0;
    wordsSolved = 0;
    roundHistory = [];
    currentSelectedCardIndex = null;
    document.getElementById('score-display').innerText = score;
    document.getElementById('action-buttons').classList.add('hidden');

    // 4. Timer Logic
    if (timeVal === "unlimited") {
        isUnlimitedTime = true;
        document.getElementById('timer-display').innerText = "∞";
    } else {
        isUnlimitedTime = false;
        timeRemaining = parseInt(timeVal);
        document.getElementById('timer-display').innerText = timeRemaining;
        startTimer();
    }

    // 5. Setup Grid
    setupGrid(difficulty);
    showScreen('game-screen');
}

function setupGrid(difficulty) {
    const grid = document.getElementById('card-grid');
    grid.innerHTML = ""; // Tøm rutenett

    activeCards.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.index = index;
        card.innerText = index + 1; // Viser tall 1-8 på baksiden
        card.onclick = () => flipCard(index, item, difficulty);
        grid.appendChild(card);
    });
}

function flipCard(index, item, difficulty) {
    // Hvis kortet allerede er ferdig (solved/skipped), gjør ingenting
    const cardEl = document.querySelector(`.game-card[data-index='${index}']`);
    if (cardEl.classList.contains('solved') || cardEl.classList.contains('skipped')) return;

    // Hvis vi trykker på samme kort igjen, gjør ingenting
    if (currentSelectedCardIndex === index) return;

    // Reset alle andre kort til "bakside" (valgfritt, men ryddig)
    document.querySelectorAll('.game-card').forEach(c => {
        if (!c.classList.contains('solved') && !c.classList.contains('skipped')) {
            c.classList.remove('flipped');
            c.innerText = parseInt(c.dataset.index) + 1; // Sett tilbake tall
        }
    });

    // Oppdater state
    currentSelectedCardIndex = index;

    // Vis innhold
    cardEl.classList.add('flipped');
    
    // Bygg HTML inni kortet
    let contentHtml = "";
    if (typeof item === 'string') {
        contentHtml = `<div class="card-content"><span class="word-text">${item}</span></div>`;
    } else {
        // Taboo mode
        let forbiddenHtml = item.forbidden.map(f => `<li>- ${f}</li>`).join('');
        contentHtml = `
            <div class="card-content">
                <span class="word-text" style="color:#e74c3c">${item.word}</span>
                <ul class="forbidden-list">${forbiddenHtml}</ul>
            </div>
        `;
    }
    cardEl.innerHTML = contentHtml;

    // Vis knapper
    document.getElementById('action-buttons').classList.remove('hidden');
}

function handleResult(action) {
    if (currentSelectedCardIndex === null) return;

    const cardEl = document.querySelector(`.game-card[data-index='${currentSelectedCardIndex}']`);
    let wordObj = activeCards[currentSelectedCardIndex];
    let wordText = (typeof wordObj === 'string') ? wordObj : wordObj.word;

    if (action === 'correct') {
        score++;
        cardEl.classList.add('solved');
        roundHistory.push({ word: wordText, status: "correct" });
    } else {
        // Pass
        score--; // Fjern denne linjen hvis du ikke vil ha minuspoeng
        cardEl.classList.add('skipped');
        roundHistory.push({ word: wordText, status: "passed" });
    }

    cardEl.classList.remove('flipped');
    cardEl.innerHTML = "✓"; // Eller "X" for pass

    // Oppdater score
    document.getElementById('score-display').innerText = score;

    // Skjul knapper til neste kort er valgt
    document.getElementById('action-buttons').classList.add('hidden');
    currentSelectedCardIndex = null;
    wordsSolved++;

    // Sjekk om spillet er ferdig (alle 8 kort tatt)
    if (wordsSolved >= 8) {
        endGame();
    }
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById('timer-display').innerText = timeRemaining;
        if (timeRemaining <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    showScreen('summary-screen');
    document.getElementById('final-score').innerText = score;
    
    const list = document.getElementById('review-list');
    list.innerHTML = "";
    roundHistory.forEach(r => {
        let li = document.createElement('li');
        li.innerText = `${r.word} (${r.status})`;
        li.style.color = (r.status === 'correct') ? 'green' : 'red';
        list.appendChild(li);
    });
}

function resetGame() {
    showScreen('setup-screen');
}
