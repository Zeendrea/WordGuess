/**
 * GameController - Main game controller that coordinates all components
 */
import { GameState } from './GameState.js';
import { GameGrid } from './GameGrid.js';
import { Input } from './Input.js';
import { ScoreDisplay } from './ScoreDisplay.js';
import { Message } from './Message.js';
import { LandingPage } from './LandingPage.js';

export class GameController {
    constructor() {
        // Initialize game state
        this.gameState = new GameState();
        
        // Initialize landing page
        this.landingPage = new LandingPage('landing-page');
        
        // Initialize components (will be reinitialized when game starts)
        this.grid = null;
        this.input = null;
        this.scoreDisplay = new ScoreDisplay('score', 'best-score');
        this.message = new Message('message');
        
        // Setup landing page callbacks
        this.landingPage.onStartGame = (difficulty) => {
            this.startGame(difficulty);
        };
        
        // Setup button callbacks only (input will be setup in init)
        this.setupButtonCallbacks();
        
        // Ensure game container is hidden initially
        const gameContainer = document.querySelector('.container');
        if (gameContainer) {
            gameContainer.style.display = 'none';
        }
    }
    
    startGame(difficulty) {
        // Hide landing page
        this.landingPage.hide();
        
        // Show game container
        const gameContainer = document.querySelector('.container');
        if (gameContainer) {
            gameContainer.style.display = 'block';
        }
        
        // Initialize game with selected difficulty
        this.init(difficulty);
    }
    
    setupButtonCallbacks() {
        // Wait for DOM to be ready
        setTimeout(() => {
            // Restart button
            const restartBtn = document.getElementById('restart-btn');
            if (restartBtn) {
                restartBtn.addEventListener('click', () => {
                    this.restart();
                });
            }
            
            // Hint button
            const hintBtn = document.getElementById('hint-btn');
            if (hintBtn) {
                hintBtn.addEventListener('click', () => {
                    this.handleHint();
                });
            }
        }, 0);
    }
    
    init(difficulty = 'medium') {
        // Set difficulty in game state
        this.gameState.setDifficulty(difficulty);
        
        // Reset game state (this will use the new difficulty settings)
        this.gameState.reset();
        
        // Reinitialize grid with new dimensions
        this.grid = new GameGrid('game-grid', this.gameState.MAX_ATTEMPTS, this.gameState.WORD_LENGTH);
        
        // Reinitialize input with new word length
        this.input = new Input(this.grid, this.gameState.WORD_LENGTH);
        this.input.setCurrentRow(0); // Start at first row
        this.input.enable();
        
        // Setup input callback
        this.input.onSubmit = (guess) => {
            this.handleSubmit(guess);
        };
        
        // Update displays
        this.scoreDisplay.updateScore(this.gameState.score);
        this.scoreDisplay.updateBestScore(this.gameState.bestScore);
        this.message.reset(this.gameState.WORD_LENGTH);
        
        // Reset hint button
        const hintBtn = document.getElementById('hint-btn');
        if (hintBtn) {
            hintBtn.disabled = false;
            hintBtn.style.opacity = '1';
            hintBtn.style.cursor = 'pointer';
        }
    }
    
    handleSubmit(guess = null) {
        if (this.gameState.gameOver || !this.input.enabled) return;
        
        // Get guess from input if not provided
        if (!guess) {
            guess = this.input.getValue();
        }
        
        // Check if we have a complete word
        if (guess.length !== this.gameState.WORD_LENGTH) {
            this.message.showError(`Please enter ${this.gameState.WORD_LENGTH} letters!`);
            return;
        }
        
        // Store current attempt before submission (for row index)
        const currentRow = this.gameState.currentAttempt;
        
        // Validate guess
        const validation = this.gameState.validateGuess(guess);
        if (!validation.valid) {
            this.message.showError(validation.message);
            this.grid.shakeRow(currentRow);
            this.input.clear();
            return;
        }
        
        // Submit guess
        const result = this.gameState.submitGuess(guess);
        const lastGuess = this.gameState.guesses[this.gameState.guesses.length - 1];
        
        // Update grid with feedback colors (use stored row index)
        this.grid.updateRow(currentRow, lastGuess.guess, lastGuess.feedback);
        
        // Handle game end
        if (result.win) {
            this.handleWin(result.score);
        } else if (result.gameOver) {
            this.handleLose();
        } else {
            // Move to next row
            this.message.showAttempt(this.gameState.currentAttempt + 1, this.gameState.MAX_ATTEMPTS);
            this.input.setCurrentRow(this.gameState.currentAttempt);
            this.input.clear();
        }
    }
    
    handleWin(score) {
        this.scoreDisplay.updateScore(this.gameState.score);
        this.scoreDisplay.updateBestScore(this.gameState.bestScore);
        this.message.showWin(score);
        this.input.disable();
    }
    
    handleLose() {
        this.message.showLose(this.gameState.secretWord);
        this.input.disable();
    }
    
    handleHint() {
        if (this.gameState.gameOver || this.gameState.hintUsed) return;
        
        const hint = this.gameState.getHint();
        if (!hint) {
            this.message.showError('All letters are already revealed!');
            return;
        }
        
        this.message.showHint(hint.letter, hint.position);
        
        // Disable hint button
        const hintBtn = document.getElementById('hint-btn');
        if (hintBtn) {
            hintBtn.disabled = true;
            hintBtn.style.opacity = '0.5';
            hintBtn.style.cursor = 'not-allowed';
        }
    }
    
    restart() {
        // Restart with current difficulty
        this.init(this.gameState.currentDifficulty);
    }
}