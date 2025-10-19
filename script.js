// Celebrity data with images and names
const celebrities = [
    {
        name: "Kendall Jenner",
        image: "kendall_j_ass.jpg",
        category: "Actress"
    },
    {
        name: "Sabrina Carpenter",
        image: "sab_carp_ass.png",
        category: "Singer"
    },
    {
        name: "Sydney Sweeney",
        image: "syd_swe_ass.png",
        category: "Actress"
    },
    {
        name: "Scarlett Johansson",
        image: "scar_john_ass.jpg",
        category: "Actress"
    },
    {
        name: "Ana De Armas",
        image: "ana_d_ass.png",
        category: "Actress"
    },
    {
        name: "Meryl Streep",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
        category: "Actress"
    },
    {
        name: "Will Smith",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        category: "Actor"
    },
    {
        name: "Angelina Jolie",
        image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop&crop=face",
        category: "Actress"
    },
    {
        name: "Brad Pitt",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        category: "Actor"
    },
    {
        name: "Natalie Portman",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
        category: "Actress"
    },
    {
        name: "Robert Downey Jr.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        category: "Actor"
    },
    {
        name: "Emma Watson",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        category: "Actress"
    },
    {
        name: "Johnny Depp",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        category: "Actor"
    }
];

// Game state
let currentQuestion = 0;
let score = 0;
let playerName = "";
let gameQuestions = [];
let currentCelebrity = null;

// DOM elements
const playerNameInput = document.getElementById('playerName');
const startGameBtn = document.getElementById('startGame');
const gameArea = document.getElementById('gameArea');
const gameOverArea = document.getElementById('gameOver');
const currentPlayerSpan = document.getElementById('currentPlayer');
const currentScoreSpan = document.getElementById('currentScore');
const questionNumberSpan = document.getElementById('questionNumber');
const celebrityImg = document.getElementById('celebrityImg');
const optionBtns = document.querySelectorAll('.option-btn');
const feedback = document.getElementById('feedback');
const feedbackText = document.getElementById('feedbackText');
const nextQuestionBtn = document.getElementById('nextQuestion');
const finalPlayerName = document.getElementById('finalPlayerName');
const finalScore = document.getElementById('finalScore');
const scoreMessage = document.getElementById('scoreMessage');
const playAgainBtn = document.getElementById('playAgain');

// Event listeners
startGameBtn.addEventListener('click', startGame);
nextQuestionBtn.addEventListener('click', nextQuestion);
playAgainBtn.addEventListener('click', resetGame);

// Allow Enter key to start game
playerNameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        startGame();
    }
});

// Start the game
function startGame() {
    playerName = playerNameInput.value.trim();
    
    if (!playerName) {
        alert('Please enter your name to start the game!');
        return;
    }
    
    // Hide start screen and show game
    document.querySelector('header').classList.add('hidden');
    gameArea.classList.remove('hidden');
    
    // Set player name
    currentPlayerSpan.textContent = playerName;
    
    // Generate random questions
    generateQuestions();
    
    // Start first question
    showQuestion();
}

// Generate 10 random questions
function generateQuestions() {
    const shuffled = [...celebrities].sort(() => 0.5 - Math.random());
    gameQuestions = shuffled.slice(0, 10);
}

// Show current question
function showQuestion() {
    currentCelebrity = gameQuestions[currentQuestion];
    
    // Update UI
    questionNumberSpan.textContent = currentQuestion + 1;
    currentScoreSpan.textContent = score;
    
    // Set celebrity image
    celebrityImg.src = currentCelebrity.image;
    celebrityImg.alt = currentCelebrity.name;
    
    // Generate options (correct answer + 3 random wrong answers)
    const options = generateOptions();
    
    // Set option buttons
    optionBtns.forEach((btn, index) => {
        btn.textContent = options[index];
        btn.classList.remove('correct', 'incorrect', 'disabled');
        btn.disabled = false;
        
        // Add click event
        btn.onclick = () => selectAnswer(index, options[index]);
    });
}

// Generate 4 options (1 correct + 3 random)
function generateOptions() {
    const correctAnswer = currentCelebrity.name;
    const wrongAnswers = celebrities
        .filter(celeb => celeb.name !== correctAnswer)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(celeb => celeb.name);
    
    const allOptions = [correctAnswer, ...wrongAnswers];
    return allOptions.sort(() => 0.5 - Math.random());
}

// Handle answer selection
function selectAnswer(selectedIndex, selectedAnswer) {
    const correctAnswer = currentCelebrity.name;
    const isCorrect = selectedAnswer === correctAnswer;
    
    // Disable all buttons
    optionBtns.forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled');
    });
    
    // Mark correct and incorrect answers
    optionBtns.forEach((btn, index) => {
        if (btn.textContent === correctAnswer) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    // Update score
    if (isCorrect) {
        score++;
        currentScoreSpan.textContent = score;
    }
    
    // Show feedback
    showFeedback(isCorrect, correctAnswer);
}

// Show feedback
function showFeedback(isCorrect, correctAnswer) {
    feedbackText.textContent = isCorrect 
        ? `🎉 Correct! It's ${correctAnswer}!`
        : `❌ Wrong! The correct answer is ${correctAnswer}.`;
    
    feedbackText.className = isCorrect ? 'correct' : 'incorrect';
    feedback.classList.remove('hidden');
}

// Move to next question
function nextQuestion() {
    feedback.classList.add('hidden');
    currentQuestion++;
    
    if (currentQuestion < 10) {
        showQuestion();
    } else {
        showGameOver();
    }
}

// Show game over screen
function showGameOver() {
    gameArea.classList.add('hidden');
    gameOverArea.classList.remove('hidden');
    
    finalPlayerName.textContent = playerName;
    finalScore.textContent = score;
    
    // Set score message
    let message = '';
    let messageClass = '';
    
    if (score >= 9) {
        message = '🌟 Outstanding! You\'re a ASS expert!';
        messageClass = 'excellent';
    } else if (score >= 7) {
        message = '👏 Great job! You know your ASS well!';
        messageClass = 'good';
    } else if (score >= 5) {
        message = '👍 Not bad! Keep practicing!';
        messageClass = 'average';
    } else {
        message = '💪 Better luck next time! Try again!';
        messageClass = 'poor';
    }
    
    scoreMessage.textContent = message;
    scoreMessage.className = `score-message ${messageClass}`;
}

// Reset game
function resetGame() {
    currentQuestion = 0;
    score = 0;
    playerName = "";
    gameQuestions = [];
    currentCelebrity = null;
    
    // Reset UI
    gameOverArea.classList.add('hidden');
    gameArea.classList.add('hidden');
    document.querySelector('header').classList.remove('hidden');
    
    // Clear player name input
    playerNameInput.value = '';
    playerNameInput.focus();
}

// Initialize
playerNameInput.focus();

