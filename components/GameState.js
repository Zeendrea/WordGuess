/**
 * GameState - Manages all game state
 */
export class GameState {
    constructor() {
        // Difficulty configurations
        this.DIFFICULTIES = {
            easy: {
                wordLength: 4,
                maxAttempts: 7,
                words: ['BOOK', 'TREE', 'FISH', 'MOON', 'STAR', 'FOOD', 'WIND', 'RAIN', 'HAND', 'FOOT']
            },
            medium: {
                wordLength: 5,
                maxAttempts: 6,
                words: ['APPLE', 'HOUSE', 'PLANT', 'BRAIN', 'CHAIR', 'TABLE', 'MUSIC', 'WATER', 'LIGHT', 'SMILE']
            },
            hard: {
                wordLength: 6,
                maxAttempts: 5,
                words: ['PUZZLE', 'ORANGE', 'CASTLE', 'MARKET', 'ROCKET', 'BOTTLE', 'PLANET', 'WINDOW', 'FLOWER', 'GARDEN']
            }
        };
        
        // Default difficulty (will be set when user selects)
        this.currentDifficulty = 'medium';
        this.WORDS = this.DIFFICULTIES[this.currentDifficulty].words;
        this.MAX_ATTEMPTS = this.DIFFICULTIES[this.currentDifficulty].maxAttempts;
        this.WORD_LENGTH = this.DIFFICULTIES[this.currentDifficulty].wordLength;
        
        // Initialize score (persists across games)
        this.score = 0;
        
        this.loadBestScore();
    }
    
    setDifficulty(difficulty) {
        if (this.DIFFICULTIES[difficulty]) {
            this.currentDifficulty = difficulty;
            this.WORDS = this.DIFFICULTIES[difficulty].words;
            this.MAX_ATTEMPTS = this.DIFFICULTIES[difficulty].maxAttempts;
            this.WORD_LENGTH = this.DIFFICULTIES[difficulty].wordLength;
        }
    }
    
    reset() {
        // Select random word from current difficulty's word list
        this.secretWord = this.WORDS[Math.floor(Math.random() * this.WORDS.length)];
        this.currentAttempt = 0;
        this.guesses = [];
        this.gameOver = false;
        this.currentGameScore = 0;
        this.hintUsed = false;
        // Note: score is NOT reset - it persists across games
    }
    
    loadBestScore() {
        this.bestScore = parseInt(localStorage.getItem('bestScore') || '0');
    }
    
    saveBestScore() {
        if (this.currentGameScore > this.bestScore) {
            this.bestScore = this.currentGameScore;
            localStorage.setItem('bestScore', this.bestScore.toString());
        }
    }
    
    validateGuess(guess) {
        // Check length
        if (guess.length !== this.WORD_LENGTH) {
            return { valid: false, message: `Please enter exactly ${this.WORD_LENGTH} letters!` };
        }
        
        // Check if it's a valid word (only letters)
        if (!/^[A-Za-z]+$/.test(guess)) {
            return { valid: false, message: 'Only letters are allowed!' };
        }
        
        // Check if word exists in word list
        if (!this.WORDS.includes(guess.toUpperCase())) {
            return { valid: false, message: 'Word not in dictionary! Try another word.' };
        }
        
        return { valid: true };
    }
    
    checkGuess(guess) {
        const feedback = Array(this.WORD_LENGTH).fill('absent');
        const secretLetters = this.secretWord.split('');
        const guessLetters = guess.toUpperCase().split('');
        
        // First pass: mark correct positions
        for (let i = 0; i < this.WORD_LENGTH; i++) {
            if (guessLetters[i] === secretLetters[i]) {
                feedback[i] = 'correct';
                secretLetters[i] = null;
                guessLetters[i] = null;
            }
        }
        
        // Second pass: mark present (correct letter, wrong position)
        for (let i = 0; i < this.WORD_LENGTH; i++) {
            if (guessLetters[i] === null) continue;
            
            const letterIndex = secretLetters.indexOf(guessLetters[i]);
            if (letterIndex !== -1) {
                feedback[i] = 'present';
                secretLetters[letterIndex] = null;
            }
        }
        
        return feedback;
    }
    
    submitGuess(guess) {
        const feedback = this.checkGuess(guess);
        this.guesses.push({ guess: guess.toUpperCase(), feedback });
        
        const isWin = feedback.every(status => status === 'correct');
        
        if (isWin) {
            const attemptsUsed = this.currentAttempt + 1;
            this.currentGameScore = (this.MAX_ATTEMPTS - attemptsUsed + 1) * 10;
            this.score += this.currentGameScore;
            this.gameOver = true;
            this.saveBestScore();
            return { win: true, score: this.currentGameScore };
        } else {
            this.currentAttempt++;
            if (this.currentAttempt >= this.MAX_ATTEMPTS) {
                this.gameOver = true;
                return { win: false, gameOver: true };
            }
            return { win: false, gameOver: false };
        }
    }
    
    getHint() {
        if (this.hintUsed) return null;
        
        const revealedIndices = this.guesses.flatMap(g => {
            return g.feedback.map((status, idx) => status === 'correct' ? idx : -1)
                .filter(idx => idx !== -1);
        });
        
        const unrevealedIndices = [];
        for (let i = 0; i < this.WORD_LENGTH; i++) {
            if (!revealedIndices.includes(i)) {
                unrevealedIndices.push(i);
            }
        }
        
        if (unrevealedIndices.length === 0) return null;
        
        const randomIndex = unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)];
        this.hintUsed = true;
        
        return {
            letter: this.secretWord[randomIndex],
            position: randomIndex + 1
        };
    }
}