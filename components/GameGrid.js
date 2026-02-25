/**
 * GameGrid Component - Manages the game grid display
 * No-scroll, responsive design
 */
export class GameGrid {
    constructor(containerId, maxAttempts = 6, wordLength = 5) {
        this.container = document.getElementById(containerId);
        this.maxAttempts = maxAttempts;
        this.wordLength = wordLength;
        this.gridCells = [];
        this.init();
        this.setupResponsive();
    }
    
    init() {
        this.container.innerHTML = '';
        this.gridCells = [];
        
        // Apply CSS grid layout
        this.container.style.display = 'grid';
        this.container.style.gridTemplateRows = `repeat(${this.maxAttempts}, 1fr)`;
        this.container.style.gridTemplateColumns = `repeat(${this.wordLength}, 1fr)`;
        this.container.style.aspectRatio = `${this.wordLength}/${this.maxAttempts}`;
        
        // Create grid cells
        for (let row = 0; row < this.maxAttempts; row++) {
            const rowCells = [];
            for (let col = 0; col < this.wordLength; col++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.textContent = '';
                this.container.appendChild(cell);
                rowCells.push(cell);
            }
            this.gridCells.push(rowCells);
        }
    }
    
    updateRow(rowIndex, guess, feedback) {
        const rowCells = this.gridCells[rowIndex];
        
        // First, set all letters with pop animation
        for (let col = 0; col < this.wordLength; col++) {
            const cell = rowCells[col];
            if (cell) {
                cell.textContent = guess[col];
                cell.classList.add('filled');
            }
        }
        
        // Then add flip animations with staggered delay
        for (let col = 0; col < this.wordLength; col++) {
            const cell = rowCells[col];
            if (cell && feedback && feedback[col]) {
                setTimeout(() => {
                    cell.classList.add('flip', feedback[col]);
                    // Remove flip class after animation
                    setTimeout(() => {
                        cell.classList.remove('flip');
                    }, 500);
                }, col * 300); // Staggered animation
            }
        }
    }
    
    shakeRow(rowIndex) {
        const rowCells = this.gridCells[rowIndex];
        rowCells.forEach(cell => {
            cell.classList.add('shake');
            setTimeout(() => {
                cell.classList.remove('shake');
            }, 500);
        });
    }
    
    clear() {
        this.gridCells.forEach(row => {
            row.forEach(cell => {
                cell.textContent = '';
                cell.className = 'grid-cell';
                cell.classList.remove('filled', 'flip', 'shake', 'correct', 'present', 'absent');
            });
        });
    }
    
    setupResponsive() {
        // Responsive setup if needed in the future
        // Currently handled by CSS media queries
    }
}