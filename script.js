/* --- DATA / WORD LISTS --- */
// Du kan enkelt legge til flere ord her!
const gameData = {
    general: {
        easy: ["Apple", "Car", "Dog", "House", "Ball", "Sun", "Book", "Chair", "Shoe", "Tree"],
        medium: ["Breakfast", "Football field", "Cinema", "Hospital", "Homework", "Summer", "Library", "Friend"],
        hard: [
            { word: "Democracy", forbidden: ["Vote", "Election", "Country"] },
            { word: "Freedom", forbidden: ["Free", "Prison", "Liberty"] },
            { word: "Jealousy", forbidden: ["Envy", "Girlfriend", "Want"] },
            { word: "Sustainability", forbidden: ["Green", "Environment", "Earth"] }
        ]
    },
    gaming: {
        easy: ["Mouse", "Screen", "Keyboard", "Headset", "Phone"],
        medium: ["Streamer", "Level up", "Game Over", "Controller", "Online"],
        hard: [
            { word: "Influencer", forbidden: ["Social Media", "Followers", "Instagram"] },
            { word: "Lag", forbidden: ["Slow", "Internet", "Glitch"] },
            { word: "Noob", forbidden: ["New", "Bad", "Player"] }
        ]
    },
    school: {
        easy: ["Pen", "Desk", "Teacher", "Bus", "Lunch"],
        medium: ["Principal", "Canteen", "Subject", "Blackboard", "Recess"],
        hard: [
            { word: "Detention", forbidden: ["Punishment", "Stay", "School"] },
            { word: "Curriculum", forbidden: ["Plan", "Subjects", "Learn"] },
            { word: "Assignment", forbidden: ["Homework", "Task", "Teacher"] }
        ]
    }
};

/* --- STATE VARIABLES --- */
let currentWords = [];
let currentWordIndex = 0;
let score = 0;
let timer;
let timeRemaining;
let roundHistory = []; // For review at the end

/* --- DOM ELEMENTS --- */
const screens = {
    setup: document.getElementById('setup-screen'),
    game: document.getElementById('game-screen'),
    summary: document.getElementById('summary-screen')
};

/* --- FUNCTIONS --- */

function showScreen(screenName) {
    // Hide all screens
    Object.values(screens).forEach(s => {
        s.classList.remove('active');
        s.classList.add('hidden');
    });
    // Show requested screen
    screens[screenName].classList.remove('hidden');
    screens[screenName].classList.add('active');
}

function startGame() {
    // 1. Get Settings
    const category = document.getElementById('category-select').value;
    const difficulty = document.getElementById('difficulty-select').value;
    const timeSetting = parseInt(document.getElementById('timer-select').value);

    // 2. Prepare Data
    let sourceData = gameData[category][difficulty];
    
    if (!sourceData) {
        alert("No words found for this category/level yet!");
        return;
    }

    // Clone array to avoid modifying original data
    currentWords = [...sourceData];
    // Shuffle words
    currentWords.sort(() => Math.random() - 0.5);

    // 3. Reset Game State
    score = 0;
    currentWordIndex = 0;
    roundHistory = [];
    timeRemaining = timeSetting;
    
    document.getElementById('score-display').innerText = score;
    document.getElementById('timer-display').innerText = timeRemaining;

    // 4. Update UI for Difficulty
    const forbiddenSection = document.getElementById('forbidden-words');
    if (difficulty === 'hard') {
        forbiddenSection.classList.remove('hidden');
    } else {
        forbiddenSection.classList.add('hidden');
    }

    // 5. Start Game Loop
    showScreen('game');
    loadWord();
    startTimer();
}

function loadWord() {
    // Check if empty
    if (currentWordIndex >= currentWords.length) {
        endRound();
        return;
    }

    const data = currentWords[currentWordIndex];
    const wordElement = document.getElementById('current-word');
    const forbiddenList = document.getElementById('forbidden-list');

    // Handle string vs object (Hard mode has objects)
    if (typeof data === 'string') {
        wordElement.innerText = data;
    } else {
        wordElement.innerText = data.word;
        // Populate forbidden words
        forbiddenList.innerHTML = "";
        data.forbidden.forEach(fw => {
            let li = document.createElement('li');
            li.innerText = fw;
            forbiddenList.appendChild(li);
        });
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById('timer-display').innerText = timeRemaining;
        
        if (timeRemaining <= 0) {
            endRound();
        }
    }, 1000);
}

function correctWord() {
    updateHistory("correct");
    score++;
    document.getElementById('score-display').innerText = score;
    nextWord();
}

function passWord() {
    updateHistory("passed");
    score--; // Optional: Remove this line if you don't want minus points
    document.getElementById('score-display').innerText = score;
    nextWord();
}

function nextWord() {
    currentWordIndex++;
    loadWord();
}

function updateHistory(status) {
    let word = "";
    const data = currentWords[currentWordIndex];
    
    if (typeof data === 'string') {
        word = data;
    } else {
        word = data.word;
    }
    
    roundHistory.push({ word: word, status: status });
}

function endRound() {
    clearInterval(timer);
    showScreen('summary');
    document.getElementById('final-score').innerText = score;
    
    // Generate Review List
    const list = document.getElementById('review-list');
    list.innerHTML = ""; // Clear old
    
    roundHistory.forEach(item => {
        let li = document.createElement('li');
        li.innerText = item.word + (item.status === "passed" ? " (Skipped)" : " (Correct)");
        li.className = "review-item " + item.status;
        list.appendChild(li);
    });
}

function resetGame() {
    showScreen('setup');
}
