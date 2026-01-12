/* --- DATA --- */
const gameData = {
    general: {
        easy: ["House", "Car", "Dog", "Cat", "Book", "Chair", "Sun", "Water"],
        medium: ["Bicycle", "Garden", "Clock", "Kitchen", "Phone", "Newspaper", "Window", "Door"],
        hard: ["Environment", "Electricity", "Transportation", "Government", "Furniture", "Celebration", "Technology", "Neighbour"]
    },
    emotions: {
        easy: ["Happy", "Sad", "Angry", "Scared", "Tired", "Funny", "Good", "Bad"],
        medium: ["Nervous", "Bored", "Lonely", "Excited", "Shy", "Proud", "Surprised", "Jealous"],
        hard: ["Embarrassed", "Frustrated", "Disappointed", "Confused", "Anxious", "Grateful", "Guilty", "Curious"]
    },
    travel: {
        easy: ["Bus", "Train", "Car", "Hotel", "Ticket", "Boat", "Beach", "Map"],
        medium: ["Suitcase", "Airport", "Passport", "Tourist", "Camping", "Island", "Bridge", "Holiday"],
        hard: ["Destination", "Accommodation", "Passenger", "Customs", "Sightseeing", "Currency", "Arrival", "Departure"]
    },
    food: {
        easy: ["Pizza", "Apple", "Milk", "Bread", "Egg", "Candy", "Fish", "Ice cream"],
        medium: ["Breakfast", "Chicken", "Vegetable", "Restaurant", "Waiter", "Onion", "Potato", "Cheese"],
        hard: ["Ingredient", "Vegetarian", "Spicy", "Recipe", "Delicious", "Nutrition", "Cutlery", "Barbecue"]
    },
    shopping: {
        easy: ["Money", "Shop", "Bag", "Price", "Clothes", "Shoe", "Sale", "Cash"],
        medium: ["Customer", "Wallet", "Cheap", "Expensive", "Market", "Mall", "Gift", "Size"],
        hard: ["Receipt", "Discount", "Cashier", "Changing room", "Credit card", "Brand", "Refund", "Queue"]
    },
    family: {
        easy: ["Mom", "Dad", "Sister", "Brother", "Baby", "Grandma", "Grandpa", "Boy"],
        medium: ["Aunt", "Uncle", "Cousin", "Parents", "Husband", "Wife", "Twins", "Pet"],
        hard: ["Relative", "Stepfather", "Nephew", "Niece", "Generation", "Ancestor", "Sibling", "Adoption"]
    },
    school: {
        easy: ["Pen", "Desk", "Teacher", "Book", "Class", "Bag", "Ruler", "Student"],
        medium: ["Homework", "Exam", "Break", "Gym", "Eraser", "Computer", "Library", "Subject"],
        hard: ["Principal", "Curriculum", "Detention", "Calculator", "Schedule", "Education", "Grades", "Presentation"]
    },
    gaming: {
        easy: ["Game", "Win", "Lose", "PC", "Mouse", "Keyboard", "Screen", "Play"],
        medium: ["Level", "Online", "Team", "Cheat", "Password", "Headset", "Controller", "Zombie"],
        hard: ["Graphics", "Multiplayer", "Connection", "Update", "Strategy", "Console", "Glitch", "Virtual Reality"]
    },
    social: {
        easy: ["Phone", "Picture", "Video", "Chat", "Like", "App", "WiFi", "Link"],
        medium: ["Comment", "Share", "Profile", "Message", "Block", "Search", "Follower", "Selfie"],
        hard: ["Influencer", "Algorithm", "Privacy", "Notification", "Hashtag", "Fake news", "Viral", "Subscribe"]
    },
    movies: {
        easy: ["Song", "Star", "Film", "Cinema", "Pop", "Rock", "Drum", "Radio"],
        medium: ["Actor", "Concert", "Ticket", "Horror", "Comedy", "Scene", "Guitar", "Singer"],
        hard: ["Director", "Soundtrack", "Audience", "Celebrity", "Lyrics", "Instrument", "Genre", "Special effects"]
    },
    sports: {
        easy: ["Football", "Run", "Swim", "Ball", "Goal", "Dance", "Paint", "Bike"],
        medium: ["Team", "Match", "Helmet", "Skiing", "Drawing", "Reading", "Training", "Score"],
        hard: ["Referee", "Competition", "Equipment", "Victory", "Tournament", "Knitting", "Opponent", "Hobby"]
    },
    body: {
        easy: ["Head", "Leg", "Arm", "Eye", "Sick", "Doctor", "Hand", "Foot"],
        medium: ["Stomach", "Heart", "Brain", "Muscle", "Fever", "Medicine", "Blood", "Dentist"],
        hard: ["Skeleton", "Surgery", "Appointment", "Ambulance", "Infection", "Mental health", "Vaccine", "Throat"]
    },
    jobs: {
        easy: ["Police", "Doctor", "Teacher", "Driver", "Farmer", "Cook", "Singer", "King"],
        medium: ["Nurse", "Firefighter", "Boss", "Artist", "Worker", "Pilot", "Soldier", "Actor"],
        hard: ["Lawyer", "Carpenter", "Scientist", "Engineer", "Journalist", "Mechanic", "Salary", "Interview"]
    },
    weather: {
        easy: ["Sun", "Rain", "Snow", "Wind", "Tree", "Flower", "Moon", "Star"],
        medium: ["Storm", "Cloud", "Forest", "River", "Mountain", "Summer", "Winter", "Ice"],
        hard: ["Climate", "Lightning", "Thunder", "Temperature", "Hurricane", "Pollution", "Forecast", "Earthquake"]
    },
    action: {
        easy: ["Eat", "Sleep", "Run", "Jump", "Talk", "Walk", "Play", "Stop"],
        medium: ["Shout", "Think", "Learn", "Watch", "Build", "Drive", "Cook", "Dance"],
        hard: ["Whisper", "Argue", "Imagine", "Discover", "Decide", "Create", "Remember", "Promise"]
    },
    describing: {
        easy: ["Big", "Small", "Red", "Blue", "Good", "Bad", "Fast", "Hot"],
        medium: ["Beautiful", "Strong", "Smart", "Boring", "Clean", "Dirty", "Rich", "Poor"],
        hard: ["Dangerous", "Mysterious", "Delicious", "Comfortable", "Ancient", "Necessary", "Invisible", "Typical"]
    },
    world: {
        easy: ["USA", "UK", "London", "New York", "English", "Flag", "Cowboy", "Tea"],
        medium: ["Dollar", "Castle", "Queen", "Halloween", "Christmas", "Soldier", "Farm", "Capital"],
        hard: ["Statue of Liberty", "Kangaroo", "Tradition", "Thanksgiving", "Accent", "Skyscraper", "Empire", "Native"]
    },
    crime: {
        easy: ["Police", "Thief", "Gun", "Dead", "Jail", "Run", "Money", "Bad guy"],
        medium: ["Prison", "Killer", "Blood", "Secret", "Spy", "Fight", "Steal", "Mask"],
        hard: ["Detective", "Evidence", "Murder", "Guilty", "Innocent", "Witness", "Mystery", "Weapon"]
    }
};

/* --- STATE --- */
let activeCards = [];
let playerScores = {};
let playerNames = [];
let timer;
let timeRemaining;
let isUnlimitedTime = false;
let currentSelectedCardIndex = null;
let wordsSolved = 0;
let roundHistory = [];

/* --- FUNCTIONS --- */

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
    
    // Hent spillernavn
    const nameInput = document.getElementById('player-input').value;
    playerNames = nameInput.split(',').map(n => n.trim()).filter(n => n.length > 0);
    
    if (playerNames.length === 0) {
        playerNames = ["Winner"];
    }

    playerScores = {};
    playerNames.forEach(name => { playerScores[name] = 0; });

    let sourceData = gameData[category][difficulty];
    if (!sourceData || sourceData.length < 8) {
        alert("Ops! Not enough words in this category yet. Need at least 8.");
        return;
    }

    // Shuffle
    let shuffled = [...sourceData].sort(() => 0.5 - Math.random());
    activeCards = shuffled.slice(0, 8);

    wordsSolved = 0;
    roundHistory = [];
    currentSelectedCardIndex = null;
    
    document.getElementById('cards-left-display').innerText = 8;
    document.getElementById('player-buttons-container').classList.add('hidden');

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

function goToMenu() {
    clearInterval(timer);
    showScreen('setup-screen');
}

function setupGrid(difficulty) {
    const grid = document.getElementById('card-grid');
    grid.innerHTML = "";

    activeCards.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.index = index;
        card.innerText = index + 1; 
        card.onclick = () => flipCard(index, item);
        grid.appendChild(card);
    });
}

function flipCard(index, item) {
    const cardEl = document.querySelector(`.game-card[data-index='${index}']`);
    
    if (cardEl.classList.contains('solved') || cardEl.classList.contains('skipped')) return;
    if (currentSelectedCardIndex === index) return;

    document.querySelectorAll('.game-card').forEach(c => {
        if (!c.classList.contains('solved') && !c.classList.contains('skipped')) {
            c.classList.remove('flipped');
            c.innerText = parseInt(c.dataset.index) + 1;
        }
    });

    currentSelectedCardIndex = index;
    cardEl.classList.add('flipped');
    
    let contentHtml = "";
    if (typeof item === 'string') {
        contentHtml = `<div class="card-content"><span class="word-text">${item}</span></div>`;
    } else {
        // Fallback for object-based words (if mixed data)
        contentHtml = `<div class="card-content"><span class="word-text">${item.word}</span></div>`;
    }
    cardEl.innerHTML = contentHtml;
    
    generatePlayerButtons();
}

function generatePlayerButtons() {
    const container = document.getElementById('player-buttons-container');
    container.innerHTML = ""; 
    container.classList.remove('hidden');

    playerNames.forEach(name => {
        const btn = document.createElement('button');
        btn.className = 'btn-player';
        btn.innerText = name;
        btn.onclick = () => handleResult(name); 
        container.appendChild(btn);
    });

    const passBtn = document.createElement('button');
    passBtn.className = 'btn-pass-action';
    passBtn.innerText = "Pass / No one";
    passBtn.onclick = () => handleResult(null); 
    container.appendChild(passBtn);
}

function handleResult(winnerName) {
    if (currentSelectedCardIndex === null) return;

    const cardEl = document.querySelector(`.game-card[data-index='${currentSelectedCardIndex}']`);
    let wordObj = activeCards[currentSelectedCardIndex];
    let wordText = (typeof wordObj === 'string') ? wordObj : wordObj.word;

    if (winnerName) {
        playerScores[winnerName]++;
        cardEl.classList.add('solved');
        cardEl.innerHTML = "★"; 
        roundHistory.push({ word: wordText, winner: winnerName, status: 'correct' });
    } else {
        cardEl.classList.add('skipped');
        cardEl.innerHTML = "X"; 
        roundHistory.push({ word: wordText, winner: '-', status: 'passed' });
    }

    cardEl.classList.remove('flipped');
    document.getElementById('player-buttons-container').classList.add('hidden');
    
    currentSelectedCardIndex = null;
    wordsSolved++;
    
    document.getElementById('cards-left-display').innerText = (8 - wordsSolved);

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
    
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = "";
    
    let sortedPlayers = Object.keys(playerScores).sort((a,b) => playerScores[b] - playerScores[a]);
    
    sortedPlayers.forEach(name => {
        let li = document.createElement('li');
        li.innerHTML = `<span>${name}</span> <span>${playerScores[name]} pts</span>`;
        leaderboardList.appendChild(li);
    });
    
    const list = document.getElementById('review-list');
    list.innerHTML = "";
    roundHistory.forEach(r => {
        let li = document.createElement('li');
        li.innerText = `${r.word}`;
        if(r.status === 'correct') {
             li.style.color = 'var(--correct)';
             li.innerHTML += ` (Winner: ${r.winner})`;
        } else {
             li.style.color = 'var(--pass)';
             li.innerHTML += ` (Skipped)`;
        }
        li.style.fontWeight = "bold";
        li.style.marginBottom = "5px";
        list.appendChild(li);
    });
}
