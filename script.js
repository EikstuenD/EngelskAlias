/* --- DATA (Inkludert alle de nye kategoriene) --- */
const gameData = {
    general: {
        easy: ["Apple", "Car", "Sun", "Book", "Chair", "Shoe", "Tree", "Moon", "Cat", "Door", "Water", "Smile"],
        medium: ["Breakfast", "Cinema", "Hospital", "Summer", "Library", "Friend", "Weekend", "Holiday", "Music", "Garden"],
        hard: [
            { word: "Democracy", forbidden: ["Vote", "Country", "Election"] },
            { word: "Freedom", forbidden: ["Free", "Prison", "Liberty"] },
            { word: "Sustainability", forbidden: ["Green", "Earth", "Recycle"] },
            { word: "Politics", forbidden: ["Government", "Vote", "Minister"] },
            { word: "Economy", forbidden: ["Money", "Bank", "Rich"] },
            { word: "Education", forbidden: ["School", "Teacher", "Learn"] },
            { word: "Environment", forbidden: ["Nature", "Climate", "Green"] },
            { word: "Technology", forbidden: ["Computer", "Phone", "Digital"] }
        ]
    },
    gaming: {
        easy: ["Mouse", "Screen", "Keyboard", "Headset", "Phone", "iPad", "Wifi", "Battery", "Charger", "Laptop"],
        medium: ["Streamer", "Level up", "Game Over", "Controller", "Online", "Update", "Loading", "Server", "Password", "Username"],
        hard: [
            { word: "Influencer", forbidden: ["Social Media", "Followers", "Instagram"] },
            { word: "Lag", forbidden: ["Slow", "Internet", "Glitch"] },
            { word: "Noob", forbidden: ["New", "Bad", "Player"] },
            { word: "Algorithm", forbidden: ["Math", "Code", "Feed"] },
            { word: "Viral", forbidden: ["Famous", "Internet", "Video"] }
        ]
    },
    school: {
        easy: ["Pen", "Desk", "Teacher", "Bus", "Lunch", "Book", "Gym", "Math", "Ruler", "Bag"],
        medium: ["Principal", "Canteen", "Subject", "Blackboard", "Recess", "Library", "Exam", "Science", "History", "Project"],
        hard: [
            { word: "Detention", forbidden: ["Punishment", "Stay", "School"] },
            { word: "Curriculum", forbidden: ["Plan", "Subjects", "Learn"] },
            { word: "Assignment", forbidden: ["Homework", "Task", "Teacher"] },
            { word: "Bullying", forbidden: ["Mean", "Fight", "Sad"] }
        ]
    },
    family: {
        easy: ["Mom", "Dad", "Baby", "Sister", "Brother", "House", "Room", "Cat", "Dog", "Grandma"],
        medium: ["Cousin", "Wedding", "Birthday", "Parents", "Garden", "Kitchen", "Living room", "Neighbor"],
        hard: [
            { word: "Generation", forbidden: ["Age", "Old", "Young"] },
            { word: "Ancestors", forbidden: ["Dead", "Family", "History"] },
            { word: "Inheritance", forbidden: ["Money", "Die", "Will"] },
            { word: "Sibling", forbidden: ["Brother", "Sister", "Family"] }
        ]
    },
    shopping: {
        easy: ["Money", "Shop", "Bag", "Food", "Clothes", "Shoe", "Card", "Coin", "Price", "Sale"],
        medium: ["Receipt", "Cashier", "Wallet", "Expensive", "Cheap", "Customer", "Market", "Mall"],
        hard: [
            { word: "Inflation", forbidden: ["Prices", "High", "Money"] },
            { word: "Discount", forbidden: ["Sale", "Percent", "Cheap"] },
            { word: "Budget", forbidden: ["Plan", "Spend", "Save"] },
            { word: "Warranty", forbidden: ["Guarantee", "Break", "Fix"] }
        ]
    },
    food: {
        easy: ["Pizza", "Apple", "Banana", "Milk", "Bread", "Water", "Cake", "Ice cream", "Egg", "Fish"],
        medium: ["Restaurant", "Breakfast", "Dinner", "Vegetable", "Kitchen", "Chef", "Menu", "Waiter"],
        hard: [
            { word: "Vegetarian", forbidden: ["Meat", "Eat", "Animal"] },
            { word: "Recipe", forbidden: ["Cook", "List", "Make"] },
            { word: "Ingredients", forbidden: ["Food", "Make", "Mix"] },
            { word: "Calories", forbidden: ["Energy", "Fat", "Diet"] }
        ]
    },
    travel: {
        easy: ["Car", "Bus", "Train", "Plane", "Boat", "Ticket", "Hotel", "Map", "Beach", "Sun"],
        medium: ["Airport", "Passport", "Suitcase", "Tourist", "Holiday", "Station", "Traffic", "Driver"],
        hard: [
            { word: "Destination", forbidden: ["Place", "Go", "End"] },
            { word: "Sightseeing", forbidden: ["Look", "Tour", "Camera"] },
            { word: "Souvenir", forbidden: ["Buy", "Gift", "Memory"] },
            { word: "Customs", forbidden: ["Airport", "Check", "Bag"] }
        ]
    },
    emotions: {
        easy: ["Happy", "Sad", "Angry", "Scared", "Funny", "Tired", "Sick", "Cold", "Hot", "Love"],
        medium: ["Nervous", "Excited", "Bored", "Lonely", "Proud", "Jealous", "Surprised", "Lucky"],
        hard: [
            { word: "Anxiety", forbidden: ["Scared", "Nervous", "Fear"] },
            { word: "Confidence", forbidden: ["Self", "Believe", "Strong"] },
            { word: "Empathy", forbidden: ["Feel", "Understand", "Others"] },
            { word: "Optimistic", forbidden: ["Positive", "Good", "Happy"] }
        ]
    }
};

/* --- STATE VARIABLES --- */
let activeCards = [];
let score = 0;
let timer;
let timeRemaining;
let isUnlimitedTime = false;
let currentSelectedCardIndex = null;
let wordsSolved = 0;
let roundHistory = [];

/* --- FUNCTIONS --- */

// Bytter mellom skjermer (Setup, Game, Summary)
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.classList.add('hidden');
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

    let sourceData = gameData[category][difficulty];
    
    // Sjekker om det er nok ord
    if (!sourceData || sourceData.length < 8) {
        alert("Ops! Not enough words in this category yet (Need 8). Try another category.");
        return;
    }

    // Stokker ordene og velger 8
    let shuffled = [...sourceData].sort(() => 0.5 - Math.random());
    activeCards = shuffled.slice(0, 8);

    // Nullstiller
    score = 0;
    wordsSolved = 0;
    roundHistory = [];
    currentSelectedCardIndex = null;
    document.getElementById('score-display').innerText = score;
    document.getElementById('action-buttons').classList.add('hidden');

    // Timer Logic
    clearInterval(timer); 
    if (timeVal === "unlimited") {
        isUnlimitedTime = true;
        document.getElementById('timer-display').innerText = "∞";
    } else {
        isUnlimitedTime = false;
        timeRemaining = parseInt(timeVal);
        document.getElementById('timer-display').innerText = timeRemaining;
        startTimer();
    }

    setupGrid(difficulty);
    showScreen('game-screen');
}

// Funksjon for å gå tilbake til menyen
function goToMenu() {
    clearInterval(timer);
    showScreen('setup-screen');
}

function setupGrid(difficulty) {
    const grid = document.getElementById('card-grid');
    grid.innerHTML = ""; // Tømmer rutenettet

    activeCards.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.index = index;
        card.innerText = index + 1; // Tallet på baksiden
        card.onclick = () => flipCard(index, item);
        grid.appendChild(card);
    });
}

function flipCard(index, item) {
    const cardEl = document.querySelector(`.game-card[data-index='${index}']`);
    if (cardEl.classList.contains('solved') || cardEl.classList.contains('skipped')) return;

    // Hvis vi trykker på det samme kortet igjen
    if (currentSelectedCardIndex === index) return;

    // Lukk alle andre kort visuelt
    document.querySelectorAll('.game-card').forEach(c => {
        if (!c.classList.contains('solved') && !c.classList.contains('skipped')) {
            c.classList.remove('flipped');
            c.innerText = parseInt(c.dataset.index) + 1;
        }
    });

    currentSelectedCardIndex = index;
    cardEl.classList.add('flipped');
    
    // Generer innholdet på kortet
    let contentHtml = "";
    if (typeof item === 'string') {
        contentHtml = `<div class="card-content"><span class="word-text">${item}</span></div>`;
    } else {
        // Taboo / Hard mode
        let forbiddenHtml = item.forbidden.map(f => `<li>🚫 ${f}</li>`).join('');
        contentHtml = `
            <div class="card-content">
                <span class="word-text" style="color:#E74C3C; font-size:1.2rem;">${item.word}</span>
                <ul class="forbidden-list">${forbiddenHtml}</ul>
            </div>
        `;
    }
    cardEl.innerHTML = contentHtml;

    // Vis knappene
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
        score--; // Minuspoeng
        cardEl.classList.add('skipped');
        roundHistory.push({ word: wordText, status: "passed" });
    }

    // Fjern teksten på kortet, vis symbol
    cardEl.classList.remove('flipped');
    cardEl.innerHTML = action === 'correct' ? "★" : "X"; 

    document.getElementById('score-display').innerText = score;
    document.getElementById('action-buttons').classList.add('hidden');
    
    currentSelectedCardIndex = null;
    wordsSolved++;

    if (wordsSolved >= 8) {
        endGame();
    }
}

function startTimer() {
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
        li.innerText = `${r.word}`;
        li.style.color = (r.status === 'correct') ? 'var(--correct)' : 'var(--pass)';
        li.style.fontWeight = "bold";
        li.style.marginBottom = "5px";
        
        let icon = r.status === 'correct' ? ' ✅' : ' ❌';
        li.innerText += icon;
        
        list.appendChild(li);
    });
}
