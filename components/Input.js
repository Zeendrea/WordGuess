/**
 * Input Component - Manages keyboard input and displays letters in grid tiles
 * No input field - captures keyboard events directly
 */
export class Input {
    constructor(gridComponent, wordLength = 5) {
        this.grid = gridComponent;
        this.wordLength = wordLength;
        this.currentGuess = []; // Array of letters for current guess
        this.currentRow = 0; // Current row being filled
        this.onSubmit = null;
        this.enabled = true;
        this.init();
    }
    
    init() {
        // Clear current guess
        this.currentGuess = [];
        this.enabled = true;
        
        // Setup keyboard event listeners
        this.setupKeyboardListeners();
    }
    
    setupKeyboardListeners() {
        // Use keydown for better control (captures all keys including special keys)
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });
    }
    
    handleKeyPress(e) {
        // Don't process if disabled or game is over
        if (!this.enabled) return;
        
        // Prevent default behavior for letters, backspace, and enter
        if (this.isLetter(e.key) || e.key === 'Backspace' || e.key === 'Enter') {
            e.preventDefault();
        }
        
        // Handle letter input
        if (this.isLetter(e.key)) {
            this.addLetter(e.key.toUpperCase());
        }
        // Handle backspace
        else if (e.key === 'Backspace') {
            this.removeLetter();
        }
        // Handle enter (submit)
        else if (e.key === 'Enter') {
            this.submit();
        }
    }
    
    isLetter(key) {
        // Check if key is a letter (A-Z, case insensitive)
        return /^[a-z]$/i.test(key);
    }
    
    addLetter(letter) {
        // Only add if we haven't reached the word length limit
        if (this.currentGuess.length < this.wordLength) {
            this.currentGuess.push(letter);
            this.updateGridDisplay();
        }
    }
    
    removeLetter() {
        // Remove last letter if there are any
        if (this.currentGuess.length > 0) {
            this.currentGuess.pop();
            this.updateGridDisplay();
        }
    }
    
    updateGridDisplay() {
        // Update the current row in the grid to show the letters
        if (!this.grid || !this.grid.gridCells) return;
        
        const rowCells = this.grid.gridCells[this.currentRow];
        
        if (rowCells) {
            // Update each cell in the current row
            for (let col = 0; col < this.wordLength; col++) {
                const cell = rowCells[col];
                if (cell) {
                    if (col < this.currentGuess.length) {
                        // Show letter if we have one
                        cell.textContent = this.currentGuess[col];
                        cell.classList.add('filled');
                    } else {
                        // Clear cell if no letter
                        cell.textContent = '';
                        cell.classList.remove('filled');
                    }
                    // Remove feedback colors (they'll be added after submission)
                    // Only remove if not already submitted (check if cell has feedback class)
                    if (!cell.classList.contains('correct') && 
                        !cell.classList.contains('present') && 
                        !cell.classList.contains('absent')) {
                        // Safe to remove - cell hasn't been submitted yet
                    }
                }
            }
        }
    }
    
    submit() {
        // Only submit if we have a complete word
        if (this.currentGuess.length === this.wordLength && this.onSubmit) {
            const guess = this.currentGuess.join('');
            this.onSubmit(guess);
        }
    }
    
    getValue() {
        // Return current guess as a string
        return this.currentGuess.join('');
    }
    
    clear() {
        // Clear current guess and update display
        this.currentGuess = [];
        this.updateGridDisplay();
    }
    
    setCurrentRow(rowIndex) {
        // Set which row we're currently filling
        this.currentRow = rowIndex;
        this.clear(); // Clear guess when moving to new row
    }
    
    disable() {
        // Disable keyboard input
        this.enabled = false;
    }
    
    enable() {
        // Enable keyboard input
        this.enabled = true;
    }
    
    // Remove keyboard listeners (cleanup if needed)
    removeListeners() {
        // Note: We keep listeners active, but check enabled state
        // This is simpler than tracking and removing listeners
    }
}